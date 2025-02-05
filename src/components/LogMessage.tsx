type LogMessageProps = {
  log: {
    type: string,
    message: string
  }
}

export default function LogMessage({ log } : LogMessageProps) {
  return (
    <p className={`${log.type === "error" ? "bg-danger" : "bg-success"} p-4 rounded-xl  md:text-center text-white font-semibold`}>{log.message}</p>
  )
}
