// src/components/user/UserPage.js
import React, { useState } from "react";
import {
  Box,
  Container,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { AccountCircle, Payment, Lock, Security } from "@mui/icons-material";
import { pxToRem } from "../../utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import ProfileSection from "./ProfileSection";
import BillingSection from "./BillingSection";
import PasswordSection from "./PasswordSection";
import TwoFactorSetup from "./TwoFactorSetup";

const drawerWidth = 240;

const UserPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [selectedSection, setSelectedSection] = useState("profile");

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "profile":
        return <ProfileSection />;
      case "billing":
        return <BillingSection />;
      case "password":
        return <PasswordSection />;
      case "twofactorsetup":
        return <TwoFactorSetup />;
      default:
        return <ProfileSection />;
    }
  };

  const menuItems = [
    { key: "profile", icon: <AccountCircle />, label: t("profile") },
    { key: "billing", icon: <Payment />, label: t("billing") },
    { key: "password", icon: <Lock />, label: t("password") },
    { key: "twofactorsetup", icon: <Security />, label: t("twofactorsetup") },
  ];

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        mt: pxToRem(50),
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 100px)",
      }}>
      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        {/* Sidebar Drawer for Desktop */}
        {!isMobile && (
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
                backgroundColor: theme.palette.background.paper,
                borderRight: `1px solid ${theme.palette.divider}`,
              },
            }}>
            <Box sx={{ textAlign: "center", py: 2 }}>
              <Typography variant="h6" noWrap>
                {t("userPage.title")}
              </Typography>
            </Box>
            <List>
              {menuItems.map((item) => (
                <ListItemButton
                  key={item.key}
                  selected={selectedSection === item.key}
                  onClick={() => handleSectionChange(item.key)}
                  sx={{
                    my: 1,
                    mx: 2,
                    borderRadius: pxToRem(8),
                    transition: "all 0.3s",
                    "&.Mui-selected": {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      "& .MuiListItemIcon-root": {
                        color: theme.palette.primary.contrastText,
                      },
                    },
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 2,
                      justifyContent: "center",
                      color:
                        selectedSection === item.key
                          ? theme.palette.primary.contrastText
                          : theme.palette.text.primary,
                    }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>
          </Drawer>
        )}

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: theme.palette.background.default,
            p: pxToRem(4),
            overflowY: "auto",
            paddingBottom: isMobile ? pxToRem(56) : pxToRem(32), // Spazio per la BottomNavigation
          }}>
          <Box
            sx={{
              bgcolor: theme.palette.background.paper,
              p: pxToRem(4),
              borderRadius: pxToRem(8),
              boxShadow: theme.shadows[3],
              transition: "all 0.3s ease",
            }}>
            {renderSection()}
          </Box>
        </Box>
      </Box>

      {/* Bottom Navigation for Mobile */}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          }}>
          <BottomNavigation
            value={selectedSection}
            onChange={(event, newValue) => {
              handleSectionChange(newValue);
            }}
            showLabels>
            {menuItems.map((item) => (
              <BottomNavigationAction
                key={item.key}
                label={item.label}
                value={item.key}
                icon={item.icon}
                sx={{
                  color:
                    selectedSection === item.key
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                  "&.Mui-selected": {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            ))}
          </BottomNavigation>
        </Box>
      )}
    </Container>
  );
};

export default UserPage;
