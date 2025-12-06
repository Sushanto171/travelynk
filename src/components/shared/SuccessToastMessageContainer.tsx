import { Suspense } from 'react';
import LoginSuccessMessage from './LoginSuccessMessage';
import RegisterSuccessMessage from './RegisterSuccessMessage';
import VerifySuccessMessage from './VerifiedSuccessMessage';
import LogoutSuccessMessage from './LogoutToastMessage';

export default function SuccessToastMessageContainer() {
  return (
    <Suspense fallback={null}>
      <LoginSuccessMessage />
      <RegisterSuccessMessage />
      <VerifySuccessMessage />
      <LogoutSuccessMessage />
    </Suspense>
  );
}