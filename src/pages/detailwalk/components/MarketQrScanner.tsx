import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import type { OnResultFunction } from "react-qr-reader";
import { parseMarketQrPayload, requestStartMarket } from "../model/startWalk";

type MarketQrScannerProps = {
  roomId: number;
  onSuccess?: (marketId: string) => void;
  onClose?: () => void;
};

const MarketQrScanner = ({ roomId, onSuccess, onClose }: MarketQrScannerProps) => {
  const navigate = useNavigate();
  const [scanError, setScanError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleQrResult = useCallback<OnResultFunction>(
    (qrResult, qrError) => {
      if (qrError || !qrResult || isProcessing) {
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
            error instanceof Error
              ? error.message
              : "QR 인식에 실패했습니다."
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
            constraints={{ facingMode: { ideal: "environment" } }}
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

export default MarketQrScanner;
