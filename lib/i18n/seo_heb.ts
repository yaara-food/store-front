import { SITE_NAME } from "../const";

export const metadata_site_title = `${SITE_NAME} - מקום לצמוח`;
export const metadata_site_description =
  "צמחים ושתילים מרהיבים – הכל באהבה ובמבחר משתנה";
export const metadata_category_title = `${SITE_NAME} | קטלוג מוצרים`;
export const metadata_category_description =
  "כל הצמחים והשתילים במקום אחד – מגוון רחב של מוצרים זמינים";
export const metadata_keywords = [
  "עציצים",
  "צמחים",
  "צמחי בית",
  "קדרון",
  "מקום לצמוח",
  "שתילים",
  SITE_NAME,
];

export function getCollectionTitle(
  collectionTitle: string,
  query?: string,
): string {
  return query
    ? `תוצאות חיפוש עבור "${query}" בקטגוריית ${collectionTitle} | ${SITE_NAME}`
    : `${collectionTitle} | ${SITE_NAME}`;
}

export function getCollectionDescription(
  collectionTitle: string,
  query?: string,
): string {
  return query
    ? `מוצרים תואמים ל"${query}" בקטגוריית ${collectionTitle}`
    : `קטגוריית ${collectionTitle} - מבחר מוצרים ייחודיים`;
}
