const select = document.querySelector.bind(document);

const slider = select("input[type='range']");
const preview = select(".preview");
const bill = select(".card__bill");
const duration = select(".card__duration");
const toggleSwitch = select(".switch input[type='checkbox']");

/*-------------Helper Function ----------------------*/
const pipe =
  (...fns) =>
  (val) =>
    fns.reduce((acc, prev) => prev(acc), val);
const discount = (dis) => (amt) => (amt * (100 - dis)) / 100;
const yearlySub = (amt) => amt * 12;
const identity = (x) => x;
const discountOnYearlySub = pipe(yearlySub, discount(25));

//Page views
const pageViews = (value, coupon = false) => {
  //calculate billing depending on subscription basis
  payment = coupon ? discountOnYearlySub : identity;

  switch (value) {
    case 0:
      return display("", 0, 0);
    case 1:
      return display("10K", payment(8), 20);
    case 2:
      return display("50K", payment(12), 40);
    case 3:
      return display("100K", payment(16), 60);
    case 4:
      return display("500K", payment(24), 80);
    case 5:
      return display("1M", payment(36), 100);
    default:
      return display("100K", payment(16), 60);
  }
};

slider.addEventListener("input", () => {
  //Invoke the pageVies function and pass the  current slider value
  pageViews(Number(slider.value));
});

toggleSwitch.addEventListener("click", (evt) => {
  //Apply discount on checked
  let coupon = evt.target.checked ? true : false;

  //change subscription content
  duration.textContent = coupon ? "/ yearly" : "/ monthly";

  //invoke the pageViews function with the current value of slider as param.
  pageViews(Number(slider.value), coupon);
});

//Display view
const display = (...args) => {
  const [views, price, percent] = args;
  console.log(views, price, percent);
  preview.textContent = views;
  bill.textContent = `$${price}.00`;
  slider.style.background = `linear-gradient(90deg, var(--clr-primary-90) ${percent}%, var(--clr-neutral-120) ${percent}%)`;
};
