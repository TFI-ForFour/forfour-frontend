import { useCallback, useState } from "react"; // useEffect 제거
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import type { OnResultFunction } from "react-qr-reader";
import { parseMarketQrPayload, requestStartMarket } from "../model/startWalk";

type MarketQrScannerProps = {
  roomId: number;
  onSuccess?: (marketId: string) => void;
  onClose?: () => void;
};

const MarketQrScanner = ({
  roomId,
  onSuccess,
  onClose,
}: MarketQrScannerProps) => {
  const navigate = useNavigate();
  const [scanError, setScanError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // 카메라 에러 상태 관리가 필요하다면 QrReader의 onResult나 onError prop을 활용하는 것이 좋습니다.
  // 여기서는 단순화를 위해 제거했으나, 필요시 QrReader 내부에서 처리되는 에러를 잡아야 합니다.

  const handleQrResult = useCallback<OnResultFunction>(
    (qrResult, qrError) => {
      // 1. 에러가 있거나, 결과가 없거나, 처리 중이면 무시
      if (qrError) {
        // qrError는 스캔 중 QR을 못 찾을 때도 계속 발생하므로
        // 실제 카메라 권한 에러인지 구분이 필요할 수 있습니다.
        // 보통은 로그를 찍지 않거나 무시합니다.
        return;
      }

      if (!qrResult || isProcessing) {
        return;
      }

      const processScan = async () => {
        try {
          setIsProcessing(true);
          const text = qrResult.getText();
          if (!text) {
            throw new Error("QR 내용이 비어 있습니다.");
          }

          const { marketId } = parseMarketQrPayload(text);
          await requestStartMarket(roomId, marketId);

          setResult(`시장 ${marketId}로 시작 지점을 설정했습니다.`);
          setScanError(null);
          onSuccess?.(marketId);
          navigate(`/walking/${roomId}`);
        } catch (error) {
          console.error(error);
          setScanError(
            error instanceof Error ? error.message : "QR 인식에 실패했습니다."
          );
        } finally {
          setIsProcessing(false);
        }
      };

      void processScan();
    },
    [isProcessing, navigate, onSuccess, roomId]
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="flex w-full max-w-lg flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/95 px-4 py-5 shadow-lg backdrop-blur">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-title-20-semibold text-gray-900">
            출발지 QR을 스캔해주세요
          </h2>
          <button
            type="button"
            className="text-14-medium text-gray-500 underline"
            onClick={onClose}
          >
            닫기
          </button>
        </div>

        <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-[3/4]">
          <QrReader
            // 핵심 수정: 복잡한 deviceId 로직을 제거하고 facingMode만 사용
            constraints={{ facingMode: "environment" }}
            onResult={handleQrResult}
            // videoStyle을 조정하여 모바일에서 꽉 차게 보이도록 설정
            videoStyle={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            containerStyle={{
              width: "100%",
              height: "100%",
            }}
            // 뷰파인더 기능을 끄고 직접 구현한 div를 사용하므로 false (라이브러리 버전에 따라 다름)
            ViewFinder={() => null}
          />
          {/* 가이드 라인 (ViewFinder 역할) */}
          <div className="pointer-events-none absolute inset-0 border-2 border-white/70" />
        </div>

        {isProcessing && (
          <p className="text-sm text-gray-500">처리 중입니다...</p>
        )}

        {result && (
          <div className="w-full rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
            {result}
          </div>
        )}

        {scanError && (
          <div className="w-full rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
            {scanError}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketQrScanner;
