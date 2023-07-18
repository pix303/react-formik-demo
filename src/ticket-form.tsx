import { Field, Form, Formik, FormikProps, useFormikContext } from "formik"
import { useCallback, useMemo, } from "react";


type Ticket = {
  type: "INFO",
  request: string,
  context: string,
} | {
  type: "ISSUE",
  request: string,
  description: string,
  part?: { name: string, code: string },
  priority: "H" | "M" | "L",
}

type Props = {
  ticketNature: Ticket["type"];
}

export function TicketRequest(props: Props) {
  const handleSubmit = useCallback((values: Ticket) => {
    console.log("API post request", values);
  }, []);

  const handleValidation = useCallback((values: Ticket) => {
    console.log("manage validation", values);
    return {}
  }, []);

  const firstValues = useMemo<Ticket>(() => {
    console.log("first values")
    let result: Ticket = {
      type: "INFO",
      request: "I'd like request info about...",
      context: "PRODUCTS"
    };

    if (props.ticketNature === "ISSUE") {
      result = {
        type: "ISSUE",
        request: "I've a problem with...",
        description: "",
        priority: "M",
        part: { code: "", name: "" },
      }
    }

    return result;
  }, [props]);


  return (
    <section>
      <Formik
        validate={handleValidation}
        onSubmit={handleSubmit}
        initialValues={firstValues}
        enableReinitialize={true}
      >
        {(formProps: FormikProps<any>) => (
          <>
            <p>{formProps.values.type === "INFO" ? "Info" : "Issue"} ticket</p>
            <Form>
              {props.ticketNature === "INFO" ? <InfoTicketInputs /> : <IssueTicketInputs />}
              <button type="submit" >Submit</button>
            </Form>
          </>
        )}
      </Formik>
    </section>
  )
}


export function InfoTicketInputs() {
  return (
    <>
      <Field type="text" name="request" />
      <Field as="select" name="context">
        <option value="PRODUCTS">Products</option>
        <option value="ACCESSORIES">Accessories</option>
        <option value="CATALOGS">Catalogs</option>
      </Field>
    </>
  )
}


export function IssueTicketInputs() {
  const { values, setFieldValue, getFieldProps } = useFormikContext<Ticket>();

  const handlePriority = useCallback((priorityValue: string) => {
    setFieldValue("priority", priorityValue);
    if (priorityValue === "H") {
      setFieldValue("description", `HIGH PRIORITY: ${getFieldProps("description").value}`)
    } else {
      setFieldValue("description", (getFieldProps("description").value as string).replace("HIGH PRIORITY: ", ""));
    }
  }, [values]);

  return (
    <>
      <Field type="text" name="request" />
      <Field type="text" name="description" />
      <Field type="text" name="part.name" />
      <Field type="text" name="part.code" />
      <Field as="select" name="priority" onChange={(e: any) => handlePriority(e.target.value)}>
        <option value="H">High</option>
        <option value="M">Medium</option>
        <option value="L">Low</option>
      </Field>
    </>
  )
}