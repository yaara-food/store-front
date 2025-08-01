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
        id="category.searchResults"
        defaultMessage="{count} products found"
        values={{ count }}
      />
    </Typography>
  );
}

export function NoProductsMessage() {
  return (
    <Typography
      data-testid="no-products"
      textAlign="center"
      mt={3}
      mx={2}
      color="text.secondary"
    >
      <FormattedMessage id="category.noProducts" />
    </Typography>
  );
}

export const OrderSuccessMessage = ({ orderId }: { orderId: number }) => (
  <>
    <Typography
      data-testid="checkout-success"
      variant="h5"
      textAlign="center"
      fontWeight="bold"
      color="success.main"
      mb={1}
    >
      <FormattedMessage id="checkout.success" />
    </Typography>
    <Typography
      variant="h6"
      textAlign="center"
      fontWeight="bold"
      color="success.main"
    >
      <FormattedMessage id="checkout.orderId" values={{ id: orderId }} />
    </Typography>
    <Typography
      variant="subtitle1"
      textAlign="center"
      fontWeight="bold"
      color="success.main"
    >
      <FormattedMessage id="checkout.email_spam1" />
    </Typography>
    <Typography
      variant="subtitle1"
      textAlign="center"
      fontWeight="bold"
      color="success.main"
    >
      <FormattedMessage id="checkout.email_spam2" />
    </Typography>
  </>
);

export const OrderErrorMessage = () => (
  <Typography
    variant="h6"
    textAlign="center"
    fontWeight="bold"
    color="error"
    sx={{ py: 4 }}
  >
    <FormattedMessage id="checkout.error" />
  </Typography>
);

export const FormFieldError = ({ fieldError }: { fieldError: string }) => (
  <Typography
    data-testid={`form-error-message-${fieldError}`}
    color="error"
    textAlign="center"
    mt={4}
    fontWeight="bold"
    fontSize="2em"
  >
    <FormattedMessage id={fieldError} />
  </Typography>
);
