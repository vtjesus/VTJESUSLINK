import { useModalStore } from '@/stores';
import { Icon } from '@iconify/react';
import './DeleteAccount.scss';

export default function DeleteAccount() {

    const { openDeleteAccountModal } = useModalStore();

    return (
        <div className="delete-account">
            <div className="text-container" onClick={openDeleteAccountModal}>
                <Icon icon="mdi:skull-crossbones" className='icon'/>
                <p>Видалити мій акаунт</p>
            </div>
        </div>
    )
}