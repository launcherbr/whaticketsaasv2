import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import { Badge, Collapse, List } from "@material-ui/core";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

import SearchIcon from "@material-ui/icons/Search";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import ContactPhoneOutlinedIcon from "@material-ui/icons/ContactPhoneOutlined";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import EventIcon from "@material-ui/icons/Event";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PeopleIcon from "@material-ui/icons/People";
import ListIcon from "@material-ui/icons/ListAlt";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import ForumIcon from "@material-ui/icons/Forum";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import RotateRight from "@material-ui/icons/RotateRight";
import { i18n } from "../translate/i18n";
import { WhatsAppsContext } from "../context/WhatsApp/WhatsAppsContext";
import { AuthContext } from "../context/Auth/AuthContext";
import LoyaltyRoundedIcon from "@material-ui/icons/LoyaltyRounded";
import { Can } from "../components/Can";
import { SocketContext } from "../context/Socket/SocketContext";
import { isArray } from "lodash";
import TableChartIcon from "@material-ui/icons/TableChart";
import api from "../services/api";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import ToDoList from "../pages/ToDoList/";
import toastError from "../errors/toastError";
import { makeStyles } from "@material-ui/core/styles";
import { AllInclusive, AttachFile, BlurCircular, Description, DeviceHubOutlined, Schedule } from "@material-ui/icons";
import usePlans from "../hooks/usePlans";
import Typography from "@material-ui/core/Typography";
import useVersion from "../hooks/useVersion";

const useStyles = makeStyles((theme) => ({
    ListSubheader: {
        height: 32,
        marginTop: 8,
        marginBottom: 4,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 8,
        position: "static",
        background:
            theme.palette.type === "dark"
                ? "linear-gradient(135deg, rgba(0, 66, 218, 0.1) 0%, rgba(125, 158, 233, 0.1) 100%)"
                : "linear-gradient(135deg, rgba(0, 66, 218, 0.05) 0%, rgba(125, 158, 233, 0.05) 100%)",
        border:
            theme.palette.type === "dark" ? "1px solid rgba(125, 158, 233, 0.2)" : "1px solid rgba(0, 66, 218, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&[hidden]": {
            display: "none !important",
        },
        "& .MuiTypography-root": {
            color: theme.palette.type === "dark" ? "#7D9EE9" : "#0042DA",
            fontWeight: 600,
            fontSize: "0.75rem",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            textAlign: "center",
        },
    },
    menuItem: {
        margin: "2px 8px",
        borderRadius: 12,
        transition: "all 0.3s ease",
        overflow: "hidden",
        "&:hover": {
            background:
                theme.palette.type === "dark"
                    ? "linear-gradient(135deg, rgba(125, 158, 233, 0.15) 0%, rgba(0, 66, 218, 0.15) 100%)"
                    : "linear-gradient(135deg, rgba(0, 66, 218, 0.08) 0%, rgba(125, 158, 233, 0.08) 100%)",
            boxShadow:
                theme.palette.type === "dark"
                    ? "0 4px 12px rgba(125, 158, 233, 0.2)"
                    : "0 4px 12px rgba(0, 66, 218, 0.15)",
        },
        "& .MuiListItemIcon-root": {
            minWidth: 40,
            color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.7)" : "#5a6c7d",
            transition: "all 0.3s ease",
        },
        "& .MuiListItemText-primary": {
            color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.9)" : "#2c3e50",
            fontWeight: 500,
            fontSize: "0.9rem",
        },
        "&:hover .MuiListItemIcon-root": {
            color: theme.palette.type === "dark" ? "#7D9EE9" : "#0042DA",
            transform: "scale(1.1)",
        },
        "&:hover .MuiListItemText-primary": {
            color: theme.palette.type === "dark" ? "#ffffff" : "#0042DA",
            fontWeight: 600,
        },
    },
    menuItemCollapsed: {
        margin: "4px 4px",
        borderRadius: 8,
        justifyContent: "center",
        "& .MuiListItemIcon-root": {
            minWidth: "auto",
            marginRight: 0,
            justifyContent: "center",
        },
    },
    activeMenuItem: {
        background:
            theme.palette.type === "dark"
                ? "linear-gradient(135deg, rgba(125, 158, 233, 0.2) 0%, rgba(0, 66, 218, 0.2) 100%)"
                : "linear-gradient(135deg, rgba(0, 66, 218, 0.1) 0%, rgba(125, 158, 233, 0.1) 100%)",
        "& .MuiListItemIcon-root": {
            color: theme.palette.type === "dark" ? "#7D9EE9" : "#0042DA",
        },
        "& .MuiListItemText-primary": {
            color: theme.palette.type === "dark" ? "#ffffff" : "#0042DA",
            fontWeight: 600,
        },
    },
    logoutButton: {
        margin: "8px",
        borderRadius: 12,
        background:
            theme.palette.type === "dark"
                ? "linear-gradient(135deg, #dc3545 0%, #c82333 100%)"
                : "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
        color: "#ffffff",
        transition: "all 0.3s ease",
        overflow: "hidden",
        "&:hover": {
            background:
                theme.palette.type === "dark"
                    ? "linear-gradient(135deg, #c82333 0%, #bd2130 100%)"
                    : "linear-gradient(135deg, #c82333 0%, #bd2130 100%)",
            transform: "translateY(-2px)",
            boxShadow: "0 6px 16px rgba(220, 53, 69, 0.3)",
        },
        "& .MuiListItemIcon-root": {
            color: "#ffffff",
            minWidth: 40,
        },
        "& .MuiListItemText-primary": {
            color: "#ffffff",
            fontWeight: 600,
        },
    },
    logoutButtonCollapsed: {
        margin: "4px",
        justifyContent: "center",
        "& .MuiListItemIcon-root": {
            minWidth: "auto",
            marginRight: 0,
        },
    },
    dividerStyled: {
        margin: "12px 16px",
        background:
            theme.palette.type === "dark"
                ? "linear-gradient(90deg, transparent 0%, rgba(125, 158, 233, 0.3) 50%, transparent 100%)"
                : "linear-gradient(90deg, transparent 0%, rgba(0, 66, 218, 0.2) 50%, transparent 100%)",
        height: 1,
    },
    dividerCollapsed: {
        margin: "8px 4px",
    },
    versionContainer: {
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: theme.palette.type === "dark" ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 66, 218, 0.03)",
        borderRadius: "8px 8px 0 0",
        borderTop:
            theme.palette.type === "dark" ? "1px solid rgba(125, 158, 233, 0.2)" : "1px solid rgba(0, 66, 218, 0.1)",
    },
    versionText: {
        fontSize: "11px",
        color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.6)" : "#5a6c7d",
        fontWeight: 500,
    },
    versionBadge: {
        backgroundColor: "#28a745",
        color: "#ffffff",
        fontSize: "9px",
        padding: "2px 6px",
        borderRadius: "10px",
        fontWeight: "bold",
        lineHeight: "normal",
        boxShadow: "0 2px 4px rgba(40, 167, 69, 0.3)",
    },
}));

function ListItemLink(props) {
    const { icon, primary, to, className, collapsed } = props;
    const classes = useStyles();

    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
        [to]
    );

    const itemClasses = `${classes.menuItem} ${collapsed ? classes.menuItemCollapsed : ""} ${className || ""}`;

    return (
        <li>
            <ListItem button dense component={renderLink} className={itemClasses}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                {!collapsed && <ListItemText primary={primary} />}
            </ListItem>
        </li>
    );
}

const reducer = (state, action) => {
    if (action.type === "LOAD_CHATS") {
        const chats = action.payload;
        const newChats = [];

        if (isArray(chats)) {
            chats.forEach((chat) => {
                const chatIndex = state.findIndex((u) => u.id === chat.id);
                if (chatIndex !== -1) {
                    state[chatIndex] = chat;
                } else {
                    newChats.push(chat);
                }
            });
        }

        return [...state, ...newChats];
    }

    if (action.type === "UPDATE_CHATS") {
        const chat = action.payload;
        const chatIndex = state.findIndex((u) => u.id === chat.id);

        if (chatIndex !== -1) {
            state[chatIndex] = chat;
            return [...state];
        } else {
            return [chat, ...state];
        }
    }

    if (action.type === "DELETE_CHAT") {
        const chatId = action.payload;

        const chatIndex = state.findIndex((u) => u.id === chatId);
        if (chatIndex !== -1) {
            state.splice(chatIndex, 1);
        }
        return [...state];
    }

    if (action.type === "RESET") {
        return [];
    }

    if (action.type === "CHANGE_CHAT") {
        const changedChats = state.map((chat) => {
            if (chat.id === action.payload.chat.id) {
                return action.payload.chat;
            }
            return chat;
        });
        return changedChats;
    }
};

const MainListItems = (props) => {
    const classes = useStyles();
    const { drawerClose, collapsed } = props;
    const { whatsApps } = useContext(WhatsAppsContext);
    const { user, handleLogout } = useContext(AuthContext);
    const [connectionWarning, setConnectionWarning] = useState(false);
    const [openCampaignSubmenu, setOpenCampaignSubmenu] = useState(false);
    const [showCampaigns, setShowCampaigns] = useState(false);
    const [showKanban, setShowKanban] = useState(false);
    const [showOpenAi, setShowOpenAi] = useState(false);
    const [showIntegrations, setShowIntegrations] = useState(false);
    const history = useHistory();
    const [showSchedules, setShowSchedules] = useState(false);
    const [showInternalChat, setShowInternalChat] = useState(false);
    const [showExternalApi, setShowExternalApi] = useState(false);

    const [invisible, setInvisible] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchParam] = useState("");
    const [chats, dispatch] = useReducer(reducer, []);
    const { getPlanCompany } = usePlans();

    const [version, setVersion] = useState(false);

    const { getVersion } = useVersion();

    const socketManager = useContext(SocketContext);

    useEffect(() => {
        async function fetchVersion() {
            const _version = await getVersion();
            setVersion(_version.version);
        }
        fetchVersion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch({ type: "RESET" });
        setPageNumber(1);
    }, [searchParam]);

    useEffect(() => {
        async function fetchData() {
            const companyId = user.companyId;
            const planConfigs = await getPlanCompany(undefined, companyId);

            setShowCampaigns(planConfigs.plan.useCampaigns);
            setShowKanban(planConfigs.plan.useKanban);
            setShowOpenAi(planConfigs.plan.useOpenAi);
            setShowIntegrations(planConfigs.plan.useIntegrations);
            setShowSchedules(planConfigs.plan.useSchedules);
            setShowInternalChat(planConfigs.plan.useInternalChat);
            setShowExternalApi(planConfigs.plan.useExternalApi);
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchChats();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParam, pageNumber]);

    useEffect(() => {
        const companyId = localStorage.getItem("companyId");
        const socket = socketManager.getSocket(companyId);

        socket.on(`company-${companyId}-chat`, (data) => {
            if (data.action === "new-message") {
                dispatch({ type: "CHANGE_CHAT", payload: data });
            }
            if (data.action === "update") {
                dispatch({ type: "CHANGE_CHAT", payload: data });
            }
        });
        return () => {
            socket.disconnect();
        };
    }, [socketManager]);

    useEffect(() => {
        let unreadsCount = 0;
        if (chats.length > 0) {
            for (let chat of chats) {
                for (let chatUser of chat.users) {
                    if (chatUser.userId === user.id) {
                        unreadsCount += chatUser.unreads;
                    }
                }
            }
        }
        if (unreadsCount > 0) {
            setInvisible(false);
        } else {
            setInvisible(true);
        }
    }, [chats, user.id]);

    useEffect(() => {
        if (localStorage.getItem("cshow")) {
            setShowCampaigns(true);
        }
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (whatsApps.length > 0) {
                const offlineWhats = whatsApps.filter((whats) => {
                    return (
                        whats.status === "qrcode" ||
                        whats.status === "PAIRING" ||
                        whats.status === "DISCONNECTED" ||
                        whats.status === "TIMEOUT" ||
                        whats.status === "OPENING"
                    );
                });
                if (offlineWhats.length > 0) {
                    setConnectionWarning(true);
                } else {
                    setConnectionWarning(false);
                }
            }
        }, 2000);
        return () => clearTimeout(delayDebounceFn);
    }, [whatsApps]);

    const fetchChats = async () => {
        try {
            const { data } = await api.get("/chats/", {
                params: { searchParam, pageNumber },
            });
            dispatch({ type: "LOAD_CHATS", payload: data.records });
        } catch (err) {
            toastError(err);
        }
    };

    const handleClickLogout = () => {
        //handleCloseMenu();
        handleLogout();
    };

    return (
        <div onClick={drawerClose}>
            <Can
                role={user.profile}
                perform={"drawer-service-items:view"}
                style={{
                    overflowY: "scroll",
                }}
                no={() => (
                    <>
                        <ListSubheader hidden={collapsed} className={classes.ListSubheader} inset color="inherit">
                            <Typography variant="overline">{i18n.t("Atendimento")}</Typography>
                        </ListSubheader>
                        <>
                            <ListItemLink
                                to="/tickets"
                                primary={i18n.t("mainDrawer.listItems.tickets")}
                                icon={<WhatsAppIcon />}
                                collapsed={collapsed}
                            />
                            <ListItemLink
                                to="/quick-messages"
                                primary={i18n.t("mainDrawer.listItems.quickMessages")}
                                icon={<FlashOnIcon />}
                                collapsed={collapsed}
                            />
                            {showKanban && (
                                <ListItemLink
                                    to="/kanban"
                                    primary="Kanban"
                                    icon={<LoyaltyRoundedIcon />}
                                    collapsed={collapsed}
                                />
                            )}
                            <ListItemLink
                                to="/todolist"
                                primary={i18n.t("Tarefas")}
                                icon={<BorderColorIcon />}
                                collapsed={collapsed}
                            />
                            <ListItemLink
                                to="/contacts"
                                primary={i18n.t("mainDrawer.listItems.contacts")}
                                icon={<ContactPhoneOutlinedIcon />}
                                collapsed={collapsed}
                            />
                            {showSchedules && (
                                <>
                                    <ListItemLink
                                        to="/schedules"
                                        primary={i18n.t("mainDrawer.listItems.schedules")}
                                        icon={<Schedule />}
                                        collapsed={collapsed}
                                    />
                                </>
                            )}
                            <ListItemLink
                                to="/tags"
                                primary={i18n.t("mainDrawer.listItems.tags")}
                                icon={<LocalOfferIcon />}
                                collapsed={collapsed}
                            />
                            {showInternalChat && (
                                <>
                                    <ListItemLink
                                        to="/chats"
                                        primary={i18n.t("mainDrawer.listItems.chats")}
                                        icon={
                                            <Badge color="secondary" variant="dot" invisible={invisible}>
                                                <ForumIcon />
                                            </Badge>
                                        }
                                        collapsed={collapsed}
                                    />
                                </>
                            )}
                            <ListItemLink
                                to="/helps"
                                primary={i18n.t("mainDrawer.listItems.helps")}
                                icon={<HelpOutlineIcon />}
                                collapsed={collapsed}
                            />
                        </>
                    </>
                )}
            />

            <Can
                role={user.profile}
                perform={"drawer-admin-items:view"}
                yes={() => (
                    <>
                        <ListSubheader hidden={collapsed} className={classes.ListSubheader} inset color="inherit">
                            <Typography variant="overline">{i18n.t("Gerência")}</Typography>
                        </ListSubheader>

                        <ListItemLink
                            small
                            to="/"
                            primary="Dashboard"
                            icon={<DashboardOutlinedIcon />}
                            collapsed={collapsed}
                        />

                        <ListItemLink
                            to="/relatorios"
                            primary={i18n.t("Relátorios")}
                            icon={<SearchIcon />}
                            collapsed={collapsed}
                        />
                    </>
                )}
            />
            <Can
                role={user.profile}
                perform="drawer-admin-items:view"
                yes={() => (
                    <>
                        {showCampaigns && (
                            <>
                                <ListSubheader
                                    hidden={collapsed}
                                    className={classes.ListSubheader}
                                    inset
                                    color="inherit"
                                >
                                    <Typography variant="overline">{i18n.t("Campanhas")}</Typography>
                                </ListSubheader>

                                <ListItemLink
                                    small
                                    to="/campaigns"
                                    primary={i18n.t("Listagem")}
                                    icon={<ListIcon />}
                                    collapsed={collapsed}
                                />

                                <ListItemLink
                                    small
                                    to="/contact-lists"
                                    primary={i18n.t("Listas de Contatos")}
                                    icon={<PeopleIcon />}
                                    collapsed={collapsed}
                                />

                                <ListItemLink
                                    small
                                    to="/campaigns-config"
                                    primary={i18n.t("Configurações")}
                                    icon={<ListIcon />}
                                    collapsed={collapsed}
                                />

                                {/** 
                <ListItem
                  button
                  onClick={() => setOpenCampaignSubmenu((prev) => !prev)}
                >
                  <ListItemIcon>
                    <EventAvailableIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={i18n.t("mainDrawer.listItems.campaigns")}
                  />
                  {openCampaignSubmenu ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </ListItem>
                <Collapse
                  style={{ paddingLeft: 15 }}
                  in={openCampaignSubmenu}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    
                    <ListItem onClick={() => history.push("/campaigns")} button>
                      <ListItemIcon>
                        <ListIcon />
                      </ListItemIcon>
                      <ListItemText primary="Listagem" />
                    </ListItem>

                    <ListItem
                      onClick={() => history.push("/contact-lists")}
                      button
                    >
                      <ListItemIcon>
                        <PeopleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Listas de Contatos" />
                    </ListItem>

                    <ListItem
                      onClick={() => history.push("/campaigns-config")}
                      button
                    >
                      <ListItemIcon>
                        <SettingsOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Configurações" />
                    </ListItem>

                  </List>
                </Collapse>
                */}
                            </>
                        )}

                        <ListSubheader hidden={collapsed} className={classes.ListSubheader} inset color="inherit">
                            <Typography variant="overline">{i18n.t("Administração")}</Typography>
                        </ListSubheader>

                        {user.super && (
                            <ListItemLink
                                to="/announcements"
                                primary={i18n.t("mainDrawer.listItems.annoucements")}
                                icon={<AnnouncementIcon />}
                                collapsed={collapsed}
                            />
                        )}

                        {showOpenAi && (
                            <ListItemLink
                                to="/prompts"
                                primary={i18n.t("mainDrawer.listItems.prompts")}
                                icon={<AllInclusive />}
                                collapsed={collapsed}
                            />
                        )}

                        {showIntegrations && (
                            <ListItemLink
                                to="/queue-integration"
                                primary={i18n.t("mainDrawer.listItems.queueIntegration")}
                                icon={<DeviceHubOutlined />}
                                collapsed={collapsed}
                            />
                        )}
                        <ListItemLink
                            to="/connections"
                            primary={i18n.t("mainDrawer.listItems.connections")}
                            icon={
                                <Badge badgeContent={connectionWarning ? "!" : 0} color="error">
                                    <SyncAltIcon />
                                </Badge>
                            }
                            collapsed={collapsed}
                        />
                        <ListItemLink
                            to="/files"
                            primary={i18n.t("mainDrawer.listItems.files")}
                            icon={<AttachFile />}
                            collapsed={collapsed}
                        />
                        <ListItemLink
                            to="/queues"
                            primary={i18n.t("mainDrawer.listItems.queues")}
                            icon={<AccountTreeOutlinedIcon />}
                            collapsed={collapsed}
                        />
                        <ListItemLink
                            to="/users"
                            primary={i18n.t("mainDrawer.listItems.users")}
                            icon={<PeopleAltOutlinedIcon />}
                            collapsed={collapsed}
                        />
                        {showExternalApi && (
                            <>
                                <ListItemLink
                                    to="/messages-api"
                                    primary={i18n.t("mainDrawer.listItems.messagesAPI")}
                                    icon={<CodeRoundedIcon />}
                                    collapsed={collapsed}
                                />
                            </>
                        )}
                        <ListItemLink
                            to="/financeiro"
                            primary={i18n.t("mainDrawer.listItems.financeiro")}
                            icon={<LocalAtmIcon />}
                            collapsed={collapsed}
                        />

                        <ListItemLink
                            to="/settings"
                            primary={i18n.t("mainDrawer.listItems.settings")}
                            icon={<SettingsOutlinedIcon />}
                            collapsed={collapsed}
                        />

                        {!collapsed && (
                            <React.Fragment>
                                <Divider className={classes.dividerStyled} />
                                <div className={classes.versionContainer}>
                                    <span className={classes.versionText}>v{version}</span>
                                    <span className={classes.versionBadge}>latest</span>
                                </div>
                            </React.Fragment>
                        )}
                    </>
                )}
            />
            <Divider className={`${classes.dividerStyled} ${collapsed ? classes.dividerCollapsed : ""}`} />
            <li>
                <ListItem
                    button
                    dense
                    onClick={handleClickLogout}
                    className={`${classes.logoutButton} ${collapsed ? classes.logoutButtonCollapsed : ""}`}
                >
                    <ListItemIcon>
                        <RotateRight />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary={i18n.t("Sair")} />}
                </ListItem>
            </li>
        </div>
    );
};

export default MainListItems;
