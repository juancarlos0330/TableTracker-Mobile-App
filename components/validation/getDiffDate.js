const getDiffDate = (value) => {
  const date1 = new Date(value);
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1);
  let diffvalue = Math.ceil(diffTime / 1000);

  if (diffvalue < 59) {
    return diffvalue + " Secs";
  } else if (diffvalue >= 60 && diffvalue < 3599) {
    return Math.floor(diffvalue / 60) + " Mins";
  } else if (diffvalue >= 3600 && diffvalue < 86399) {
    return Math.floor(diffvalue / 60 / 60) + " Hrs";
  } else if (diffvalue >= 86400) {
    return Math.floor(diffvalue / 60 / 60 / 24) + " Days";
  }
};

export default getDiffDate;
