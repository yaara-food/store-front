import SearchLayout from "../../components/layout/SearchLayout";

export default function CollectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SearchLayout>{children}</SearchLayout>;
}
