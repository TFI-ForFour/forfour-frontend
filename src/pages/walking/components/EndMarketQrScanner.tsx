import { useCallback, useState, useEffect } from "react";
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
  const [cameraReady, setCameraReady] = useState(false);

  // iOS에서 카메라 권한 및 초기화 확인
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!cameraReady) {
        setScanError("카메라를 불러오는 중입니다. 잠시만 기다려주세요.");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [cameraReady]);

  const handleQrResult = useCallback<OnResultFunction>(
    (qrResult, qrError) => {
      if (qrError) {
        // 카메라가 로드되면 ready 상태로 변경
        if (!cameraReady) {
          setCameraReady(true);
          setScanError(null);
        }
        return;
      }

      if (!qrResult || isProcessing) return;

      const processScan = async () => {
        try {
          setIsProcessing(true);
          const text = qrResult.getText();
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
    [isProcessing, navigate, onSuccess, roomId, cameraReady]
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
          {/* iOS Safari 호환성을 위한 수정된 설정 */}
          <QrReader
            constraints={{
              facingMode: "environment",
              // iOS에서 더 나은 호환성을 위한 추가 설정
              aspectRatio: { ideal: 1 },
              width: { ideal: 1920 },
              height: { ideal: 1080 },
            }}
            onResult={handleQrResult}
            videoStyle={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              // iOS에서 비디오가 보이도록 명시적 스타일
              display: "block",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            containerStyle={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
            videoId="qr-video"
            scanDelay={300}
            ViewFinder={() => null}
          />

          {/* 스캔 가이드 테두리 */}
          <div className="pointer-events-none absolute inset-0 border-2 border-white/70" />

          {/* 중앙 가이드 박스 (선택사항) */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-64 w-64 border-4 border-white/90 rounded-xl shadow-lg" />
          </div>

          {/* 카메라 로딩 중 표시 */}
          {!cameraReady && !scanError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-white text-center">
                <div className="mb-2">📷</div>
                <p className="text-sm">카메라 로딩 중...</p>
              </div>
            </div>
          )}
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

        {/* iOS 사용자를 위한 추가 안내 */}
        <p className="text-xs text-gray-400 text-center">
          카메라가 보이지 않으면 브라우저의 카메라 권한을 확인해주세요
        </p>
      </div>
    </div>
  );
};

export default EndMarketQrScanner;
