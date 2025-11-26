import { useCallback, useState } from "react"; // useEffect 제거 (카메라 초기화 로직 삭제됨)
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import type { OnResultFunction } from "react-qr-reader";
import {
  parseMarketQrPayload,
  requestEndMarket,
  type EndMarketResult,
} from "@/pages/detailwalk/model/startWalk";

type EndMarketQrScannerProps = {
  roomId: number;
  onSuccess?: (result: EndMarketResult) => void;
  onClose?: () => void;
};

const EndMarketQrScanner = ({
  roomId,
  onSuccess,
  onClose,
}: EndMarketQrScannerProps) => {
  const navigate = useNavigate();
  const [scanError, setScanError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // preferredDeviceId, cameraError 등 수동 제어 로직 관련 상태 삭제

  const handleQrResult = useCallback<OnResultFunction>(
    (qrResult, qrError) => {
      // 1. 에러가 있거나, 결과가 없거나, 이미 처리 중이면 무시
      if (qrError) {
        return;
      }
      if (!qrResult || isProcessing) return;

      const processScan = async () => {
        try {
          setIsProcessing(true);
          const text = qrResult.getText(); // 타입 안전성을 위해 getText() 사용 권장
          if (!text) {
            throw new Error("QR 내용이 비어 있습니다.");
          }

          const { marketId } = parseMarketQrPayload(text);
          const endResult = await requestEndMarket(roomId, marketId);

          setResult(`시장 ${marketId}로 종료 지점을 설정했습니다.`);
          setScanError(null);
          onSuccess?.(endResult);
          navigate(`/walking/${roomId}/success`, { state: { endResult } });
        } catch (error) {
          console.error(error);
          const message =
            error instanceof Error ? error.message : "QR 인식에 실패했습니다.";
          setScanError(message);
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
            도착지 QR을 스캔해주세요
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
            // 핵심 수정: iOS 호환성을 위해 복잡한 설정 제거 후 표준 설정 사용
            constraints={{ facingMode: "environment" }}
            onResult={handleQrResult}
            videoStyle={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            containerStyle={{
              width: "100%",
              height: "100%",
            }}
            // 기본 붉은색 가이드 숨김 (커스텀 테두리를 사용 중이므로)
            ViewFinder={() => null}
          />
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

export default EndMarketQrScanner;
