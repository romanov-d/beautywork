"use client";

import Link from "next/link";
import ArrowIcon from "./ArrowIcon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { name: "Лазерная эпиляция", href: "/#catalog", linkClass: "modal-link-block w-inline-block", colourClass: "modal-colour" },
  { name: "Аппаратная косметология", href: "/#catalog", linkClass: "modal-link-block is-2 w-inline-block", colourClass: "modal-colour is-2" },
];

export default function Modal({ isOpen, onClose }: ModalProps) {
  return (
    <div data-modal-group-status={isOpen ? "active" : "not-active"} className="modal">
      <div data-hover="" data-modal-close="" className="modal__dark" onClick={onClose} />
      <div data-modal-status={isOpen ? "active" : "not-active"} data-modal-name="modal-menu" className="modal__card">
        <div className="subheading">ООО КРАСИВОЕ ДЕЛО</div>
        <div className="modal__content">
          <div className="heading-3 is-modal">Категории</div>
          <div className="modal-ctas">
            {categories.map((cat) => (
              <Link key={cat.name} data-button="" href={cat.href} className={cat.linkClass} onClick={onClose}>
                <div className="modal-title">
                  <div className="heading-5 is-category">{cat.name}</div>
                </div>
                <div className="primary-button is-secondary is-modal">
                  <ArrowIcon />
                  <div data-button-text="">Посмотреть</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div data-hover="" data-modal-close="" className="modal__btn-close" onClick={onClose}>
          <div className="modal__btn-close-bar" />
          <div className="modal__btn-close-bar is--second" />
        </div>
      </div>
    </div>
  );
}
