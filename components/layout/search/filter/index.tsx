"use client";

import {
  Autocomplete,
  TextField,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { Collection } from "../../../../lib/types/entities";

function safeDecodeURIComponent(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

// Desktop list
function FilterItemList({ list }: { list: Collection[] }) {
  const router = useRouter();
  const pathname = safeDecodeURIComponent(usePathname());

  return (
    <>
      {list.map((item: Collection, index: number) => {
        const isAll = item.handle === "all";
        const isActive =
          pathname.endsWith(`/collection/${item.handle}`) ||
          (isAll && pathname === "/");

        return (
          <ListItemButton
            key={index}
            onClick={() =>
              router.push(isAll ? "/" : `/collection/${item.handle}`)
            }
            sx={{
              borderRadius: "8px",
              mb: 0.5,
              py: 1,
              px: 2,
              textAlign: "right",
              backgroundColor: isActive ? "#e0f7fa" : "transparent",
              "&:hover": {
                backgroundColor: "#e0f7fa",
              },
            }}
          >
            <ListItemText
              primary={
                <Typography
                  component="span"
                  className="collection-title"
                  sx={{
                    fontSize: "1.1em",
                    fontWeight: isActive ? "bold" : "normal",
                    color: "black",
                    textDecoration: "inherit",
                  }}
                >
                  {isAll ? (
                    <FormattedMessage id="collections.all" />
                  ) : (
                    item.title
                  )}
                </Typography>
              }
            />
          </ListItemButton>
        );
      })}
    </>
  );
}

// Main
export default function FilterList({ list }: { list: Collection[] }) {
  const router = useRouter();
  const pathname = safeDecodeURIComponent(usePathname());
  const intl = useIntl();

  const all_option = {
    handle: "all",
    title: intl.formatMessage({ id: "collections.all" }),
  } as Collection;
  const options = [all_option, ...list];

  const initialItem =
    list.find((item) => pathname.endsWith(`/collection/${item.handle}`)) ??
    (pathname === "/" ? options[0] : undefined);

  const [selectedItem, setSelectedItem] = useState<Collection | undefined>(
    initialItem,
  );

  useEffect(() => {
    const matching =
      list.find((item) => pathname.endsWith(`/collection/${item.handle}`)) ??
      (pathname === "/" ? options[0] : undefined);
    setSelectedItem(matching);
  }, [pathname, list]);

  return (
    <nav>
      {/* Desktop */}
      <div className="hidden md:block p-2">
        <FilterItemList list={options} />
      </div>

      {/* Mobile */}
      <div className="md:hidden p-2">
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.title}
          value={selectedItem}
          onChange={(event, value) => {
            const selected: Collection = value ?? all_option;
            setSelectedItem(selected);
            router.push(
              selected.handle === "all"
                ? "/"
                : `/collection/${selected.handle}`,
            );
          }}
          isOptionEqualToValue={(option, value) =>
            option.handle === value?.handle
          }
          disableClearable
          renderInput={(params) => (
            <TextField
              {...params}
              label={intl.formatMessage({
                id: "collections.selectCategory",
              })}
              InputProps={{
                ...params.InputProps,
                style: {
                  direction: "rtl",
                  fontSize: "1.1em",
                  textDecoration: "inherit",
                },
              }}
              InputLabelProps={{
                ...params.InputLabelProps,
                style: {
                  direction: "rtl",
                  textAlign: "right",
                },
              }}
            />
          )}
          renderOption={(props, option) => {
            const { key, ...rest } = props;
            return (
              <li key={option.handle} {...rest} dir="rtl">
                <span
                  style={{
                    fontSize: "1.1em",
                    textDecoration: "inherit",
                  }}
                >
                  {option.title}
                </span>
              </li>
            );
          }}
        />
      </div>
    </nav>
  );
}
