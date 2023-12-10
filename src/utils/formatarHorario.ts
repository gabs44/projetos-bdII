export function extrairHorasPrimeirosDoisValores(horaString: string) {
  const regex = /^(\d{1,2}):/;
  const match = horaString.match(regex);

  if (match && match.length > 1) {
    let duasPrimeirasHoras = match[1];
    duasPrimeirasHoras = parseInt(duasPrimeirasHoras, 10).toString();
    const novaHora = `${duasPrimeirasHoras}:00`;
    return novaHora;
  }

  return null;
}
