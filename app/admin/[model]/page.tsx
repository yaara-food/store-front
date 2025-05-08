"use client";

import * as React from "react";
import { useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";

import { useRouter } from "next/navigation";
import { useIntl, FormattedMessage } from "react-intl";

import { ModelType } from "../../../lib/form";
import { getCollections, getOrders, getProducts } from "../../../lib/api";
import { AGTableModelType, get_columns_by_title } from "../ag_table";
import { ColDef } from "ag-grid-community";
import AGTable from "../AGTable";

export default function AdminPage({
  params,
}: {
  params: { model: ModelType };
}) {
  const router = useRouter();
  const { model } = params;
  const { formatMessage } = useIntl();

  const [rows, setRows] = useState<AGTableModelType[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const cols: ColDef<AGTableModelType>[] = get_columns_by_title(model);

  React.useEffect(() => {
    const init = async () => {
      const objs =
        model === ModelType.product
          ? await getProducts(true)
          : model === ModelType.order
            ? await getOrders()
            : await getCollections(true);

      setRows(objs);
    };

    init();
  }, [model]);

  const filteredRows = React.useMemo(() => {
    if (!searchValue) return rows;
    const regex = new RegExp(searchValue, "i");
    return rows.filter((row) => regex.test(Object.values(row).join(" ")));
  }, [searchValue, rows]);

  return (
    <Container disableGutters sx={{ px: 2 }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        direction="row"
      >
        <h2 style={{ fontSize: "1.75rem", fontWeight: "bold" }}>
          <FormattedMessage id={`admin.${model}.title`} />
        </h2>

        <p style={{ fontSize: "1.2rem", fontWeight: "bold", marginTop: 4 }}>
          {filteredRows.length}
        </p>
        <TextField
          variant="outlined"
          size="small"
          placeholder={formatMessage({ id: "admin.search.placeholder" })}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          sx={{ minWidth: 200 }}
        />

        {model !== ModelType.order && (
          <Grid item display="flex" gap={2}>
            <Button
              variant="contained"
              onClick={() => router.push(`/admin/form/${model}/add`)}
              startIcon={<AddIcon />}
            >
              <FormattedMessage id={`admin.${model}.add`} />
            </Button>

            {model === ModelType.product && (
              <Button
                variant="outlined"
                onClick={() => window.open("/admin/form/image", "_blank")}
                startIcon={<ImageIcon />}
              >
                <FormattedMessage id="admin.product.image" />
              </Button>
            )}
          </Grid>
        )}
      </Grid>

      <Grid container justifyContent="center" mt={2}>
        <AGTable cols={cols} rows={filteredRows} />
      </Grid>
    </Container>
  );
}
