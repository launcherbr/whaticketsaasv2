import React, { useState, useEffect } from "react";
import qs from "query-string";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import usePlans from "../../hooks/usePlans";
import api from "../../services/api";
import InputMask from "react-input-mask";
import {
    Button,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Stepper,
    Step,
    StepLabel,
    useMediaQuery,
    Fade,
    Slide,
    CircularProgress,
} from "@material-ui/core";
import { CheckCircle, Business, Phone, Email, VpnKey, ArrowBack } from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { i18n } from "../../translate/i18n";
import { openApi } from "../../services/api";
import toastError from "../../errors/toastError";
import moment from "moment";

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
    container: {
        width: "100%",
        maxWidth: 1200,
    },
    signupCard: {
        width: "100%",
        padding: theme.spacing(4),
        borderRadius: 20,
        background: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        border:
            theme.palette.type === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: theme.palette.type === "dark" ? "0 25px 45px rgba(0, 0, 0, 0.3)" : "0 25px 45px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
    },
    formTitle: {
        marginBottom: theme.spacing(3),
        color: theme.palette.type === "dark" ? "#ffffff" : "#2c3e50",
        fontWeight: 600,
        fontSize: "2rem",
        letterSpacing: "-0.5px",
        textAlign: "center",
    },
    subtitle: {
        marginBottom: theme.spacing(4),
        color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.7)" : "#5a6c7d",
        fontSize: "1.1rem",
        textAlign: "center",
        lineHeight: 1.6,
    },
    inputField: {
        marginBottom: theme.spacing(2),
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
    pricingCard: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 16,
        background: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        border:
            theme.palette.type === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.3)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        "&:hover": {
            transform: "translateY(-8px)",
            boxShadow:
                theme.palette.type === "dark" ? "0 25px 45px rgba(0, 0, 0, 0.4)" : "0 25px 45px rgba(0, 66, 218, 0.2)",
            borderColor: "#0042DA",
        },
    },
    pricingCardSelected: {
        borderColor: "#0042DA",
        boxShadow:
            theme.palette.type === "dark" ? "0 25px 45px rgba(0, 66, 218, 0.4)" : "0 25px 45px rgba(0, 66, 218, 0.3)",
        transform: "translateY(-8px)",
    },
    pricingCardHeader: {
        padding: theme.spacing(3),
        background: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 66, 218, 0.05)",
        position: "relative",
    },
    pricingCardTitle: {
        fontWeight: 700,
        color: theme.palette.type === "dark" ? "#ffffff" : "#2c3e50",
        textAlign: "center",
    },
    pricingCardPrice: {
        display: "flex",
        justifyContent: "center",
        alignItems: "baseline",
        marginBottom: theme.spacing(2),
    },
    pricingCardPriceAmount: {
        fontSize: "2.25rem",
        fontWeight: 800,
        lineHeight: 1,
        color: "#0042DA",
    },
    pricingCardFeatures: {
        padding: theme.spacing(3),
        flexGrow: 1,
    },
    pricingCardFeature: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(1.5, 0),
        color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.8)" : "#5a6c7d",
    },
    featureIcon: {
        color: "#0042DA",
        marginRight: theme.spacing(1.5),
        fontSize: "1.2rem",
    },
    stepper: {
        padding: theme.spacing(2, 0, 3),
        background: "transparent",
        maxWidth: 400,
        margin: "0 auto",
        "& .MuiStepIcon-root": {
            fontSize: "1.5rem",
        },
        "& .MuiStepIcon-root.MuiStepIcon-active": {
            color: "#0042DA",
        },
        "& .MuiStepIcon-root.MuiStepIcon-completed": {
            color: "#0042DA",
        },
        "& .MuiStepLabel-label.MuiStepLabel-active": {
            color: theme.palette.type === "dark" ? "#7D9EE9" : "#0042DA",
            fontWeight: 600,
            fontSize: "0.95rem",
        },
        "& .MuiStepLabel-label": {
            color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.7)" : "#5a6c7d",
            fontWeight: 500,
            fontSize: "0.9rem",
        },
    },
    backButton: {
        marginBottom: theme.spacing(2),
        color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.7)" : "#5a6c7d",
        borderRadius: 8,
        padding: theme.spacing(1, 2),
        textTransform: "none",
        "&:hover": {
            backgroundColor: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 66, 218, 0.05)",
            color: theme.palette.type === "dark" ? "#7D9EE9" : "#0042DA",
        },
    },
    planSummary: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.spacing(2.5),
        background: theme.palette.type === "dark" ? "rgba(125, 158, 233, 0.1)" : "rgba(0, 66, 218, 0.05)",
        borderRadius: 12,
        marginBottom: theme.spacing(3),
        border:
            theme.palette.type === "dark" ? "1px solid rgba(125, 158, 233, 0.2)" : "1px solid rgba(0, 66, 218, 0.1)",
    },
    planName: {
        fontWeight: 600,
        color: "#0042DA",
    },
}));

const UserSchema = Yup.object().shape({
    name: Yup.string().min(2, "Nome muito curto!").max(50, "Nome muito longo!").required("Obrigatório"),
    password: Yup.string()
        .min(5, "Senha muito curta! Mínimo 5 caracteres")
        .max(50, "Senha muito longa!")
        .required("Obrigatório"),
    email: Yup.string().email("Email inválido").required("Obrigatório"),
    phone: Yup.string().min(15, "Telefone incompleto").required("Obrigatório"),
});

const SignUp = () => {
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [allowregister, setallowregister] = useState("enabled");
    const [trial, settrial] = useState("3");
    const [activeStep, setActiveStep] = useState(0);
    const [selectedPlan, setSelectedPlan] = useState(null);

    let companyId = null;

    useEffect(() => {
        fetchallowregister();
        fetchtrial();
    }, []);

    const fetchtrial = async () => {
        try {
            const responsevvv = await api.get("/settings/trial");
            const allowtrialX = responsevvv.data.value;
            settrial(allowtrialX);
        } catch (error) {
            console.error("Error retrieving trial", error);
        }
    };

    const fetchallowregister = async () => {
        try {
            const responsevv = await api.get("/settings/allowregister");
            const allowregisterX = responsevv.data.value;
            setallowregister(allowregisterX);
        } catch (error) {
            console.error("Error retrieving allowregister", error);
        }
    };

    if (allowregister === "disabled") {
        history.push("/login");
    }

    const params = qs.parse(window.location.search);
    if (params.companyId !== undefined) {
        companyId = params.companyId;
    }

    const initialState = {
        name: "",
        email: "",
        phone: "",
        password: "",
        planId: selectedPlan?.id || "",
    };

    const dueDate = moment().add(trial, "day").format();

    const handleSignUp = async (values) => {
        Object.assign(values, {
            recurrence: "MENSAL",
            dueDate: dueDate,
            status: "t",
            campaignsEnabled: true,
            planId: selectedPlan.id,
        });

        try {
            await openApi.post("/companies/cadastro", values);
            toast.success(i18n.t("signup.toasts.success"));
            history.push("/login");
        } catch (err) {
            console.log(err);
            toastError(err);
        }
    };

    const [plans, setPlans] = useState([]);
    const { register: listPlans } = usePlans();

    useEffect(() => {
        async function fetchData() {
            const list = await listPlans();
            setPlans(list);
        }
        fetchData();
    }, []);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        handleNext();
    };

    const steps = ["Selecione seu plano", "Crie sua conta"];

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={classes.signupCard}>
                    <Typography variant="h4" className={classes.formTitle}>
                        Crie sua conta
                    </Typography>
                    <Typography className={classes.subtitle}>
                        Experimente gratuitamente por {trial} dias todas as funcionalidades da nossa plataforma. Sem
                        necessidade de cartão de crédito.
                    </Typography>

                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {activeStep === 0 ? (
                        <Fade in={activeStep === 0} timeout={500}>
                            <Grid container spacing={3} justifyContent="center">
                                {plans.map((plan) => (
                                    <Grid item xs={12} sm={6} md={4} key={plan.id}>
                                        <Card
                                            className={`${classes.pricingCard} ${
                                                selectedPlan?.id === plan.id ? classes.pricingCardSelected : ""
                                            }`}
                                            onClick={() => handlePlanSelect(plan)}
                                        >
                                            <CardHeader
                                                title={plan.name}
                                                titleTypographyProps={{
                                                    align: "center",
                                                    className: classes.pricingCardTitle,
                                                    variant: "h6",
                                                }}
                                                className={classes.pricingCardHeader}
                                            />
                                            <CardContent>
                                                <div className={classes.pricingCardPrice}>
                                                    <Typography
                                                        component="h2"
                                                        variant="h3"
                                                        className={classes.pricingCardPriceAmount}
                                                    >
                                                        R${" "}
                                                        {plan.value.toLocaleString("pt-BR", {
                                                            minimumFractionDigits: 2,
                                                        })}
                                                    </Typography>
                                                    <Typography variant="body1" color="textSecondary">
                                                        /mês
                                                    </Typography>
                                                </div>
                                                <div className={classes.pricingCardFeatures}>
                                                    <div className={classes.pricingCardFeature}>
                                                        <CheckCircle className={classes.featureIcon} />
                                                        <Typography variant="body2">
                                                            <strong>{plan.connections}</strong> Conexões WhatsApp
                                                        </Typography>
                                                    </div>
                                                    <div className={classes.pricingCardFeature}>
                                                        <CheckCircle className={classes.featureIcon} />
                                                        <Typography variant="body2">
                                                            <strong>{plan.users}</strong> Usuários
                                                        </Typography>
                                                    </div>
                                                    <div className={classes.pricingCardFeature}>
                                                        <CheckCircle className={classes.featureIcon} />
                                                        <Typography variant="body2">
                                                            Suporte <strong>prioritário</strong>
                                                        </Typography>
                                                    </div>
                                                    <div className={classes.pricingCardFeature}>
                                                        <CheckCircle className={classes.featureIcon} />
                                                        <Typography variant="body2">
                                                            <strong>{trial} dias</strong> grátis
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <CardActions>
                                                <Button
                                                    fullWidth
                                                    variant={selectedPlan?.id === plan.id ? "contained" : "outlined"}
                                                    color="primary"
                                                    size="large"
                                                    style={{
                                                        margin: theme.spacing(0, 2, 2),
                                                        borderRadius: 12,
                                                        textTransform: "none",
                                                        fontWeight: 600,
                                                        padding: theme.spacing(1.5),
                                                        fontSize: "1rem",
                                                        background:
                                                            selectedPlan?.id === plan.id
                                                                ? "linear-gradient(135deg, #0042DA 0%, #7D9EE9 100%)"
                                                                : "transparent",
                                                        borderColor: "#0042DA",
                                                        color: selectedPlan?.id === plan.id ? "#ffffff" : "#0042DA",
                                                    }}
                                                >
                                                    {selectedPlan?.id === plan.id ? "Selecionado" : "Selecionar"}
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Fade>
                    ) : (
                        <Slide direction="left" in={activeStep === 1} mountOnEnter unmountOnExit>
                            <div>
                                <Button startIcon={<ArrowBack />} onClick={handleBack} className={classes.backButton}>
                                    Voltar para planos
                                </Button>

                                {selectedPlan && (
                                    <div className={classes.planSummary}>
                                        <Typography variant="body1">
                                            Plano selecionado:{" "}
                                            <span className={classes.planName}>{selectedPlan.name}</span>
                                        </Typography>
                                        <Typography variant="body1" style={{ fontWeight: 600 }}>
                                            R${" "}
                                            {selectedPlan.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                            /mês
                                        </Typography>
                                    </div>
                                )}

                                <Formik
                                    initialValues={initialState}
                                    enableReinitialize={true}
                                    validationSchema={UserSchema}
                                    onSubmit={(values, actions) => {
                                        setTimeout(() => {
                                            handleSignUp(values);
                                            actions.setSubmitting(false);
                                        }, 400);
                                    }}
                                >
                                    {({ touched, errors, isSubmitting, values }) => (
                                        <Form>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <Field
                                                        as={TextField}
                                                        autoComplete="name"
                                                        name="name"
                                                        error={touched.name && Boolean(errors.name)}
                                                        helperText={touched.name && errors.name}
                                                        variant="outlined"
                                                        fullWidth
                                                        id="name"
                                                        label="Nome da Empresa"
                                                        placeholder="Digite o nome da sua empresa"
                                                        className={classes.inputField}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <Business color="action" style={{ marginRight: 12 }} />
                                                            ),
                                                        }}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Field
                                                        as={TextField}
                                                        variant="outlined"
                                                        fullWidth
                                                        id="email"
                                                        label="Email"
                                                        name="email"
                                                        error={touched.email && Boolean(errors.email)}
                                                        helperText={touched.email && errors.email}
                                                        autoComplete="email"
                                                        placeholder="seu@email.com"
                                                        required
                                                        className={classes.inputField}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <Email color="action" style={{ marginRight: 12 }} />
                                                            ),
                                                        }}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Field name="phone">
                                                        {({ field, form }) => (
                                                            <InputMask
                                                                mask="(99) 99999-9999"
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                onBlur={field.onBlur}
                                                            >
                                                                {() => (
                                                                    <TextField
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        id="phone"
                                                                        label="Telefone"
                                                                        error={touched.phone && Boolean(errors.phone)}
                                                                        helperText={touched.phone && errors.phone}
                                                                        placeholder="(00) 00000-0000"
                                                                        required
                                                                        className={classes.inputField}
                                                                        InputProps={{
                                                                            startAdornment: (
                                                                                <Phone
                                                                                    color="action"
                                                                                    style={{ marginRight: 12 }}
                                                                                />
                                                                            ),
                                                                        }}
                                                                    />
                                                                )}
                                                            </InputMask>
                                                        )}
                                                    </Field>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Field
                                                        as={TextField}
                                                        variant="outlined"
                                                        fullWidth
                                                        name="password"
                                                        error={touched.password && Boolean(errors.password)}
                                                        helperText={touched.password && errors.password}
                                                        label="Senha"
                                                        type="password"
                                                        id="password"
                                                        placeholder="Mínimo 5 caracteres"
                                                        autoComplete="new-password"
                                                        required
                                                        className={classes.inputField}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <VpnKey color="action" style={{ marginRight: 12 }} />
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                className={classes.submitButton}
                                                disabled={isSubmitting}
                                                size="large"
                                            >
                                                {isSubmitting ? (
                                                    <CircularProgress size={24} color="inherit" />
                                                ) : (
                                                    `Iniciar teste de ${trial} dias`
                                                )}
                                            </Button>

                                            <Box mt={3} textAlign="center">
                                                <Typography
                                                    variant="body2"
                                                    style={{
                                                        color:
                                                            theme.palette.type === "dark"
                                                                ? "rgba(255, 255, 255, 0.7)"
                                                                : "#5a6c7d",
                                                    }}
                                                >
                                                    Já tem uma conta?{" "}
                                                    <Link
                                                        component={RouterLink}
                                                        to="/login"
                                                        className={classes.linkText}
                                                        style={{ fontWeight: 600 }}
                                                    >
                                                        Faça login aqui
                                                    </Link>
                                                </Typography>
                                            </Box>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </Slide>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignUp;
