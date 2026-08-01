import LoadingButton from "@mui/lab/LoadingButton";

export function SocialAuthButton({
  variant = "contained",
  type = "button",
  onClick,
  icon,
  label,
  loading = false,
  disabled = false,
  ...props
}) {
  return (
    <LoadingButton
      type={type}
      variant={variant}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      startIcon={icon}
      fullWidth
      sx={{
        color:
          variant === "contained"
            ? "primary.contrastText"
            : "primary.main",
      }}
      {...props}
    >
      {label}
    </LoadingButton>
  );
}