"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  TextField,
  InputAdornment,
  Button,
  Box,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "sonner";
import { ModelType } from "../../../lib/form";
import { FormattedMessage, useIntl } from "react-intl";

const adminRoutes = [
  { labelId: "admin.order.title", model: ModelType.order },
  { labelId: "admin.product.title", model: ModelType.product },
  { labelId: "admin.collection.title", model: ModelType.collection },
];

function AdminNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Box display="flex" gap={2} flexDirection="row">
      {adminRoutes.map((item) => {
        const isActive = pathname === `/admin/${item.model}`;

        return (
          <ListItemButton
            key={item.model}
            onClick={() => router.push(`/admin/${item.model}`)}
            sx={{
              borderRadius: "12px",
              px: 3,
              py: 0.5,
              backgroundColor: isActive ? "var(--color-accent)" : "transparent",
              transition: "background-color 0.2s ease",
              "&:hover": {
                backgroundColor: "var(--color-accent)",
              },
            }}
          >
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  sx={{
                    color: isActive ? "white" : "black",
                    fontWeight: isActive ? "bold" : "normal",
                  }}
                >
                  <FormattedMessage id={item.labelId} />
                </Typography>
              }
            />
          </ListItemButton>
        );
      })}
    </Box>
  );
}

export default function Search() {
  const intl = useIntl();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isProductPage = pathname.startsWith("/product/");
  const isAdminPage = pathname.startsWith("/admin");

  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [hasToken, setHasToken] = useState(false);
  const lastAppliedQuery = useRef<string>(initialQuery);

  useEffect(() => {
    const expiresAt = Number(localStorage.getItem("token_expires_at"));
    const isExpired = Date.now() > expiresAt;

    if (isExpired) {
      localStorage.removeItem("token");
      localStorage.removeItem("token_expires_at");
      setHasToken(false);
      return;
    }

    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, [pathname]);

  useEffect(() => {
    if (isProductPage || isAdminPage) return;
    setQuery(searchParams.get("q") || "");
    lastAppliedQuery.current = searchParams.get("q") || "";
  }, [searchParams, pathname]);

  useEffect(() => {
    if (isProductPage || isAdminPage) return;

    const timeout = setTimeout(() => {
      const trimmed = query.trim();

      if (trimmed === lastAppliedQuery.current) return;

      const params = new URLSearchParams(searchParams.toString());
      if (trimmed) {
        params.set("q", trimmed);
      } else {
        params.delete("q");
      }

      const newUrl = `${pathname}${params.toString() ? `?${params}` : ""}`;
      lastAppliedQuery.current = trimmed;
      router.replace(newUrl);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, pathname, router, searchParams]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_expires_at");
    toast.success(intl.formatMessage({ id: "logout.success" }));
    setHasToken(false);
    router.push("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  if (isProductPage) return null;

  return isAdminPage ? (
    <AdminNav />
  ) : (
    <Box display="flex" gap={2}>
      <TextField
        value={query}
        onChange={handleChange}
        placeholder={intl.formatMessage({ id: "search.placeholder" })}
        variant="outlined"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon className="text-gray-400" fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      {hasToken && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/admin")}
          >
            <FormattedMessage id="search.admin" />
          </Button>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            <FormattedMessage id="search.logout" />
          </Button>
        </>
      )}
    </Box>
  );
}
