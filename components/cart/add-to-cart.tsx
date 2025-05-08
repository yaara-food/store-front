"use client";

import AddIcon from "@mui/icons-material/Add";
import clsx from "clsx";
import { Product } from "lib/types";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/cartSlice";
import { FormattedMessage, useIntl } from "react-intl";

function SubmitButton({
  available,
  onClick,
}: {
  available: boolean;
  onClick: () => void;
}) {
  const intl = useIntl();

  const buttonClasses =
    "relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  if (!available) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        <FormattedMessage id="product.outOfStock" />
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-label={intl.formatMessage({ id: "product.addToCart" })}
      className={clsx(buttonClasses, { "hover:opacity-90": true })}
    >
      <div className="absolute left-0 ml-4">
        <AddIcon fontSize="small" />
      </div>
      <FormattedMessage id="product.addToCart" />
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({ product }));
    const openCartEvent = new CustomEvent("open-cart");
    window.dispatchEvent(openCartEvent);
  };

  return (
    <SubmitButton available={product.available} onClick={handleAddToCart} />
  );
}
