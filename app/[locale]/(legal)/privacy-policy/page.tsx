import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("global");

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[800px] wx-auto py-12 flex items-center">
        <h1 className="text-3xl font-bold">{t("privacy_policy")}</h1>
      </div>
    </div>
  );
}
