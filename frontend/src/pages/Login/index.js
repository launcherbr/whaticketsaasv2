import React, { useState, useContext, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

// Material-UI Components
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CircularProgress from "@material-ui/core/CircularProgress";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Custom Imports
import api from "../../services/api";
import { i18n } from "../../translate/i18n";
import { AuthContext } from "../../context/Auth/AuthContext";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
            theme.palette.type === "dark"
                ? "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)"
                : "linear-gradient(135deg, #0042DA 0%, #7D9EE9 100%)",
        padding: theme.spacing(2),
    },
    loginCard: {
        width: "100%",
        maxWidth: 420,
        padding: theme.spacing(5, 4),
        borderRadius: 20,
        background: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        border:
            theme.palette.type === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: theme.palette.type === "dark" ? "0 25px 45px rgba(0, 0, 0, 0.3)" : "0 25px 45px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        transition: "all 0.3s ease",
        "&:hover": {
            transform: "translateY(-5px)",
            boxShadow:
                theme.palette.type === "dark" ? "0 35px 55px rgba(0, 0, 0, 0.4)" : "0 35px 55px rgba(0, 0, 0, 0.15)",
        },
    },
    formTitle: {
        marginBottom: theme.spacing(4),
        color: theme.palette.type === "dark" ? "#ffffff" : "#2c3e50",
        fontWeight: 600,
        fontSize: "2rem",
        letterSpacing: "-0.5px",
    },
    form: {
        width: "100%",
    },
    inputField: {
        marginBottom: theme.spacing(3),
        "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            backgroundColor: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            border:
                theme.palette.type === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(255, 255, 255, 0.3)",
            transition: "all 0.3s ease",
            "& fieldset": {
                border: "none",
            },
            "&:hover": {
                backgroundColor:
                    theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.9)",
                transform: "translateY(-2px)",
                boxShadow:
                    theme.palette.type === "dark" ? "0 10px 25px rgba(0, 0, 0, 0.2)" : "0 10px 25px rgba(0, 0, 0, 0.1)",
            },
            "&.Mui-focused": {
                backgroundColor: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 1)",
                transform: "translateY(-2px)",
                boxShadow:
                    theme.palette.type === "dark"
                        ? "0 15px 35px rgba(0, 66, 218, 0.3)"
                        : "0 15px 35px rgba(0, 66, 218, 0.2)",
            },
        },
        "& .MuiInputLabel-root": {
            color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.7)" : "#5a6c7d",
            fontWeight: 500,
            "&.Mui-focused": {
                color: theme.palette.type === "dark" ? "#7D9EE9" : "#0042DA",
            },
        },
        "& .MuiOutlinedInput-input": {
            color: theme.palette.type === "dark" ? "#ffffff" : "#2c3e50",
            fontWeight: 500,
            "&::placeholder": {
                color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(44, 62, 80, 0.5)",
                opacity: 1,
            },
        },
    },
    submitButton: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1.8),
        borderRadius: 12,
        fontWeight: 600,
        fontSize: "1.1rem",
        letterSpacing: 0.5,
        textTransform: "none",
        background: "linear-gradient(135deg, #0042DA 0%, #7D9EE9 100%)",
        color: "#ffffff",
        border: "none",
        boxShadow: "0 10px 25px rgba(0, 66, 218, 0.3)",
        transition: "all 0.3s ease",
        "&:hover": {
            background: "linear-gradient(135deg, #003BB8 0%, #6B8FE6 100%)",
            transform: "translateY(-3px)",
            boxShadow: "0 15px 35px rgba(0, 66, 218, 0.4)",
        },
        "&:active": {
            transform: "translateY(-1px)",
        },
        "&:disabled": {
            background: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
            color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)",
            transform: "none",
            boxShadow: "none",
        },
    },
    linkText: {
        color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.7)" : "#5a6c7d",
        fontWeight: 500,
        textDecoration: "none",
        fontSize: "0.95rem",
        transition: "all 0.2s ease",
        "&:hover": {
            color: theme.palette.type === "dark" ? "#7D9EE9" : "#0042DA",
            textDecoration: "none",
        },
    },
    passwordIcon: {
        color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.6)" : "#5a6c7d",
        "&:hover": {
            color: theme.palette.type === "dark" ? "#7D9EE9" : "#0042DA",
        },
    },
}));

const Login = () => {
    const theme = useTheme();
    const classes = useStyles();
    const [user, setUser] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const { handleLogin, loading } = useContext(AuthContext);
    const [viewregister, setviewregister] = useState("disabled");

    const handleChangeInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        fetchviewregister();
    }, []);

    const fetchviewregister = async () => {
        try {
            const responsev = await api.get("/settings/viewregister");
            const viewregisterX = responsev?.data?.value;
            setviewregister(viewregisterX);
        } catch (error) {
            console.error("Error retrieving viewregister", error);
        }
    };

    const handlSubmit = (e) => {
        e.preventDefault();
        handleLogin(user);
    };

    return (
        <div className={classes.root}>
            <div className={classes.loginCard}>
                <Typography variant="h4" className={classes.formTitle}>
                    Acesse sua conta
                </Typography>

                <form className={classes.form} onSubmit={handlSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        value={user.email}
                        onChange={handleChangeInput}
                        autoComplete="email"
                        className={classes.inputField}
                        placeholder="seu@email.com"
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={user.password}
                        onChange={handleChangeInput}
                        autoComplete="current-password"
                        className={classes.inputField}
                        placeholder="••••••••"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        className={classes.passwordIcon}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submitButton}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
                    </Button>

                    <Grid container justifyContent="center" style={{ marginTop: 16 }}>
                        <Grid item>
                            <Typography
                                variant="body2"
                                style={{
                                    color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.7)" : "#5a6c7d",
                                }}
                            >
                                Não tem uma conta?{" "}
                                <Link
                                    component={RouterLink}
                                    to="/signup"
                                    className={classes.linkText}
                                    style={{ fontWeight: 600 }}
                                >
                                    Criar conta
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    );
};

export default Login;
