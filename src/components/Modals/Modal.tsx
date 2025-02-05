import { MouseEventHandler } from "react";
import { Icon } from '@iconify/react';
import './Modal.scss';

interface ModalProps {
    icon: string;
    topline: string;
    message: string;
    onConfirm: MouseEventHandler<HTMLButtonElement>;
    onCancel: MouseEventHandler<HTMLButtonElement>;
}

export default function Modal({ icon, topline, message, onConfirm, onCancel }: ModalProps) {
    
    return (
        <div className="modal">
            <div className='modal-content'>
                <div className="icon-container">
                    <Icon icon={icon} className="icon"/>
                </div>
                <div className="message-container">
                    <div className="text-container">
                        <p className="topline">{topline}</p>
                        <p className="message">{message}</p>
                    </div>
                    <div className="buttons-container">
                        <button className="secondary-button" onClick={onCancel}>Скасувати</button>
                        <button className="primary-button" onClick={onConfirm}>Підтвердити</button>
                    </div>
                </div>
            </div>
        </div>
    )
};