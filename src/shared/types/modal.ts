// useModal 반환 타입
export type ModalController = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

// 모달이 공통으로 사용하는 열기 props
export type ModalBaseOpenProps = {
  onOpen: () => void;
};

// 모달이 공통으로 사용하는 닫기 props
export type ModalBaseCloseProps = {
  onClose: () => void;
};

export type ChangeNickNameModalProps = ModalBaseCloseProps;
