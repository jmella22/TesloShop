import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { tesloApi } from "../../api";
import { AuthContext } from "../../context";

interface FormData {
  email: string;
  password: string;
  name: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onRegisterForm = async ({ email, name, password }: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    router.replace("/");

    try {
      const { data } = await tesloApi.post("/user/register", {
        email,
        password,
        name,
      });
      const { token, user } = data;
      console.log(token, user);
    } catch (error) {}
  };

  return (
    <AuthLayout title={"Registro"}>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component={"h1"}>
                Crear Cuenta
              </Typography>
              <Chip
                label="Este mail ya esta registrado"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type={"text"}
                label="Nombre completo"
                variant="filled"
                fullWidth
                {...register("name", {
                  required: "El nombre es requerido",
                  minLength: {
                    value: 2,
                    message: "Deben ser minimo 2 caracteres",
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type={"email"}
                label="Correo"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "El correo es requerido",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                variant="filled"
                type={"password"}
                fullWidth
                {...register("password", {
                  required: "La Password es requerida",
                  minLength: {
                    value: 6,
                    message: "Deben ser minimo 6 caracteres",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Registrarse
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent={"end"}>
              <NextLink href={"/auth/login"} passHref>
                <Link underline="always">¿Ya tienes una cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
