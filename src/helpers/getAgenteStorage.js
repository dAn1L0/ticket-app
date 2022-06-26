
export const getAgenteStorage = () => {
  return{
    agente: localStorage.getItem('agente') || null,
    ventanilla: localStorage.getItem('ventanilla') || null,
  }
}
