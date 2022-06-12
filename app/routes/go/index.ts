import type { LoaderFunction } from '@remix-run/deno'
import { redirect } from '@remix-run/deno'

export const loader: LoaderFunction = async () => {
  return redirect('/')
}
