import type { JSX } from "react/jsx-runtime";

type ModalProps = {
  onClose: () => void;
};

function Modal({ onClose }: ModalProps): JSX.Element {
  return (
    <div onClick={onClose} className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-[#111] text-white rounded-2xl p-6 w-[320px] shadow-xl border border-white/10">

        <h2 className="text-lg font-semibold mb-3">
          Movie not found
        </h2>

        <button
          onClick={onClose}
          className="
            w-full
            bg-white
            text-black
            py-2
            rounded-xl
            font-medium
            hover:bg-gray-200
            transition
          "
        >
          Close
        </button>

      </div>
    </div>
  );
}

export default Modal;
