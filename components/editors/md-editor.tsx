"use client";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { SimpleMDEReactProps } from "react-simplemde-editor";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function MdEditor(props: SimpleMDEReactProps) {
  const { value, onChange, ...rest } = props;

  return <SimpleMDE {...rest} value={value} onChange={onChange} />;
}
