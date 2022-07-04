export function setCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${value};max-age=${maxAge};path=/`;
}

export function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }

  return undefined;
}
