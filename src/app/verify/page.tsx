import VerifyEmail from "@/components/modules/auth/VerifyEmail";
import { ISearchParams } from "@/types/searchParams";

export default async function VerifyPage({ searchParams }: ISearchParams) {
  const { email , token } = await searchParams 
  return (
    <div>
      <VerifyEmail email={email! } token={token} />
    </div>
  );
}