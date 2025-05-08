"use client";

import { IntlProvider, FormattedMessage } from "react-intl";
import { ReactNode } from "react";
import { messages } from "../lib/i18n/messages";

export function NoProductsMessage() {
  return (
    <p className="py-3 text-lg">
      <FormattedMessage id="collection.noProducts" />
    </p>
  );
}

export default function IntlClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <IntlProvider locale="he" messages={messages["he"]}>
      {children}
    </IntlProvider>
  );
}
