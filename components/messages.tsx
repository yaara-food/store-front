"use client";

import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

export function SearchResultsMessage({ count }: { count: number }) {
  return (
    <Typography
      variant="h5"
      textAlign="center"
      fontWeight="bold"
      mb={2}
      color="black"
    >
      <FormattedMessage
        id="collection.searchResults"
        defaultMessage="{count} products found"
        values={{ count }}
      />
    </Typography>
  );
}

export function NoProductsMessage() {
  return (
    <Typography textAlign="center" mt={3} color="text.secondary">
      <FormattedMessage
        id="collection.noProducts"
        defaultMessage="No products found"
      />
    </Typography>
  );
}

export function H1SeoTitle() {
  return (
    <h1 className="sr-only">
      <FormattedMessage id="collection.title.seo" />
    </h1>
  );
}
