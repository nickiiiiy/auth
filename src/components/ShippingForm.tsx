import { IOption, IShippingFields } from "app.interface";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import React, { FC } from "react";
import ReactSelect from "react-select";
export const options: IOption[] = [
  {
    value: "russia",
    label: "Russia",
  },
  {
    value: "china",
    label: "China",
  },
  {
    value: "usa",
    label: "USA",
  },
  {
    value: "new-zeeland",
    label: "New Zeeland",
  },
];

export const getValue = (value: string) =>
  value ? options.find((option) => option.value === value) : "";

const ShippingForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<IShippingFields>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IShippingFields> = (data) => {
    console.log(data);
    fetch("https://65b63a6ada3a3c16ab006363.mockapi.io/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data sent successfully", data);
        reset();
      })
      .catch((error) => {
        console.error("Error sending data", error);
      });
  };
  return (
    <div>
      <h1>Shipping</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "66%", margin: "0 auto" }}
      >
        <div>
          <input
            {...register("name", {
              required: "Name is require field!",
            })}
            placeholder="name"
          />
          {errors?.name && (
            <div style={{ color: "red", marginBottom: 10 }}>
              {errors.name.message}
            </div>
          )}
        </div>
        <div style={{ marginBottom: 15 }}>
          <input
            {...register("phone", {
              required: "Phone is required field!",
              //   pattern: {
              //     value:
              //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              //     message: "Please enter valid email!",
              //   },
            })}
            placeholder="phone"
          />
          {errors?.phone && (
            <div style={{ color: "red" }}>{errors.phone.message}</div>
          )}
        </div>
        <Controller
          control={control}
          name="address.country"
          rules={{
            required: "Country is required!",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <ReactSelect
                placeholder="Countries"
                options={options}
                value={getValue(value)}
                onChange={(newValue) => onChange((newValue as IOption).value)}
              />
              {error && (
                <div style={{ color: "red", marginBottom: 10 }}>
                  {error.message}
                </div>
              )}
            </div>
          )}
        />
        <div style={{ marginTop: 15 }}>
          <input
            {...register("address.city", {
              required: "City is required field!",
            })}
            placeholder="City"
          />
          {errors?.address?.city && (
            <div style={{ color: "red", marginBottom: 10 }}>
              {errors.address.city.message}
            </div>
          )}
        </div>

        <div>
          <b>Street</b>
          <input
            {...register("address.street", {
              required: "Street is required field!",
            })}
            placeholder="Street"
          />
          {errors?.address?.street && (
            <div style={{ color: "red", marginBottom: 10 }}>
              {errors.address.street.message}
            </div>
          )}
        </div>
        <div>
          <input
            {...register("address.house", {
              required: "House is required field!",
            })}
            placeholder="House"
          />
          {errors?.address?.house && (
            <div style={{ color: "red", marginBottom: 10 }}>
              {errors.address.house.message}
            </div>
          )}
        </div>
        <button>Send</button>
      </form>
    </div>
  );
};

export default ShippingForm;
