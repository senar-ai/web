import { LoaderFunction, redirect } from '@remix-run/deno'

export const loader: LoaderFunction = async () => {
  return redirect('/')
}
