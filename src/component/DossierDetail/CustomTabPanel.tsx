import { Box } from "@mui/material";
import React from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"

        >
            {value === index && (
                <Box >
                    {children}
                </Box>
            )}
        </div>
    );
}