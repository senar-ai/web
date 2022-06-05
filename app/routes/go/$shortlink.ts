import { LoaderFunction, redirect } from '@remix-run/deno'

const shortlinks = {
  draft: 'https://docs.google.com/spreadsheets/d/1-nl7RHGsQwF12GzGfj22YJiqlwLjm1ix-hqcR1mJxWs/edit#gid=0',
  responses:
    'https://docs.google.com/spreadsheets/d/194RDJZ5aSe87GdsjEEJPcrINB18w40fkPNtGtKRDgWM/edit?resourcekey#gid=742951977',
  form: 'https://docs.google.com/forms/d/e/1FAIpQLSe3mkw1HYUkRklU_sRTk5qgdr_jItqxR7wAjP_W0uEU8HBRqA/viewform',
  db: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQUXjZ5M1lL9thjOEeNJxKsvE3VQ8i3XXUt8ryKWiya1HdapIcLuMUHKZ-VWECqCcX-cPKCZYzPXVvY/pubhtml',
  github: 'https://github.com/senar-ai/web',
}

export const loader: LoaderFunction = async ({ params: { shortlink }, request }) => {
  console.log(shortlink)
  const destination = shortlinks[shortlink]
  if (destination) {
    const { searchParams } = new URL(request.url)
    const queryParams = searchParams.toString()
    return redirect(`${destination}${queryParams ? `?${queryParams}` : ''}`)
  }
  return redirect('/')
}
