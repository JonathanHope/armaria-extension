import { zodResolver } from "@hookform/resolvers/zod";
import { ArchiveBox, Hourglass } from "@phosphor-icons/react";
import { useAtomValue, useSetAtom } from "jotai";
import React, { forwardRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { SendMessageFn } from "../../services/messages";
import { addBookmarkAtom, stateAtom, titleAtom, urlAtom } from "../../store";
import { classNames } from "../../utils";
import Button from "../Button";
import TextInput from "../TextInput";

/** Props for `AddBookForm`. */
interface AddBookFormProps {
  /** Function to send a message to a native host. */
  sendMessage: SendMessageFn;
}

/** Schema for the form to add a bookmark. */
const schema = z.object({
  url: z
    .string({
      required_error: "URL is required",
    })
    .url({
      message: "URL must be valid",
    })
    .max(2048, {
      message: "URL must be at most 2048 chars",
    }),
  name: z
    .string()
    .max(2048, {
      message: "Name must be at most 2048 chars",
    })
    .optional(),
  description: z
    .string()
    .max(4096, {
      message: "Description must be at most 4096 chars",
    })
    .optional(),
});

/** Typing for the form to add a bookmark. */
type Inputs = z.infer<typeof schema>;

/**
 * Process an optional field.
 * Undefined and empty are coerced to null.
 *
 * @param field The field value to process.
 * @returns The processed field value.
 */
const processOptionalField = (field: string | undefined): string | null => {
  if (field === undefined || field === "") {
    return null;
  }

  return field;
};

/**
 * A form to create a bookmark.
 *
 * @param props - Props for `AddBookForm`.
 * @returns A React node.
 */
const AddBookForm = forwardRef<HTMLDivElement, AddBookFormProps>(
  function AddBookForm({ sendMessage }: AddBookFormProps, ref) {
    const addBookmark = useSetAtom(addBookmarkAtom);
    const state = useAtomValue(stateAtom);
    const url = useAtomValue(urlAtom);
    const title = useAtomValue(titleAtom);

    const defaultValues: Inputs = {
      url,
      name: title,
    };

    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitted },
    } = useForm<Inputs>({
      defaultValues,
      resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
      addBookmark({
        sendMessage,
        kind: "add-book",
        payload: {
          url: data.url,
          name: processOptionalField(data.name),
          description: processOptionalField(data.description),
        },
      });
    };

    return (
      <div className={classNames("w-full")} ref={ref}>
        <h1
          className={classNames(
            "text-3xl font-bold font-['Alegreya-Bold'] text-center",
            "mt-6",
          )}
        >
          Add Book to Armaria
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className={classNames("p-6")}>
          <TextInput<Inputs>
            name="url"
            label="URL"
            placeholder="https://example.com"
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
            disabled={state === "SendingMessage"}
            autofocus={true}
          />
          <TextInput<Inputs>
            name="name"
            label="Name"
            placeholder="Website"
            register={register}
            errors={errors}
            className="mt-6"
            isSubmitted={isSubmitted}
            disabled={state === "SendingMessage"}
          />
          <TextInput<Inputs>
            name="description"
            label="Description"
            placeholder="A website on the internet."
            multiline={true}
            register={register}
            errors={errors}
            className="mt-6"
            isSubmitted={isSubmitted}
            disabled={state === "SendingMessage"}
          />

          <Button
            text="Add"
            className={classNames("mt-6")}
            disabled={state === "SendingMessage"}
          >
            {state === "SendingMessage" ? (
              <Hourglass size={22} weight="bold" />
            ) : (
              <ArchiveBox size={22} weight="bold" />
            )}
          </Button>
        </form>
      </div>
    );
  },
);

export default AddBookForm;
