const convertToTelephone = (telephone: string) => {
  if (telephone.length === 11) {
    return `${telephone.slice(0, 3)} ${telephone.slice(3, 7)} ${telephone.slice(
      7,
    )}`;
  }
  return `${telephone.slice(0, 3)} ${telephone.slice(3)}`;
};

export {convertToTelephone};
