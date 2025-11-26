import { useCallback, useEffect, useState } from "react";
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
  const [preferredDeviceId, setPreferredDeviceId] = useState<string | undefined>(undefined);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;
    const prepareCamera = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError("이 기기에서 카메라를 사용할 수 없습니다.");
        return;
      }
      try {
        // 1) 권한 요청
        const tempStream = await navigator.mediaDevices.getUserMedia({ video: true });
        // 2) 장치 목록 조회 후 후면 카메라 우선 선택
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((d) => d.kind === "videoinput");
        if (videoDevices.length === 0) {
          throw new Error("사용 가능한 카메라가 없습니다.");
        }
        const backCam =
          videoDevices.find((d) => /back|rear|환경/i.test(d.label)) ?? videoDevices[0];
        if (!canceled) {
          setPreferredDeviceId(backCam.deviceId);
          setCameraError(null);
        }
        // 3) 임시 스트림 종료
        tempStream.getTracks().forEach((track) => track.stop());
      } catch (error) {
        console.error("카메라 준비 실패:", error);
        if (!canceled) {
          setCameraError("카메라 권한이 필요합니다. 브라우저 권한을 확인해주세요.");
        }
      }
    };

    void prepareCamera();
    return () => {
      canceled = true;
    };
  }, []);

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
            constraints={
              preferredDeviceId
                ? { deviceId: { exact: preferredDeviceId } }
                : { facingMode: { ideal: "environment" } }
            }
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

        {cameraError && (
          <p className="text-sm text-red-600 text-center">{cameraError}</p>
        )}

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
