export const onlyNumber = (e: any) => {
  let tecla;

  if (e.which) {
    tecla = e.which;
  } else {
    tecla = e.keyCode;
  }

  if ((tecla >= 48 && tecla <= 57) || e.which === 8) {
    return true;
  } else {
    e.preventDefault();
  }
};
