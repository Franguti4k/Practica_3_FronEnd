//index.tsx

import MoviesContainer from "../components/MoviesContainer.tsx";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type PeliculaApi = {
  original_title: string;
  release_date: string;
  backdrop_path: string;
  popularity: number;
};
type Data = {
  results: PeliculaApi[];
  columns: number;
  query: string;
};

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown, Data>) => {
    const API_KEY = Deno.env.get("API_KEY") ?? "";
    const options = {
      method: "GET",
      headers: { accept: "application/json", Authorization: API_KEY },
    };

    try {
      const url = new URL(req.url);
      const title = url.searchParams.get("query") || undefined;
      const columns = parseInt(url.searchParams.get("columns") || "1", 10);

      // Si no hay título en la búsqueda, consulta todas las películas populares
      let searchURL = "https://api.themoviedb.org/3/search/movie?query=${title}&page=1"; 
      if (title) {
        searchURL =
          `https://api.themoviedb.org/3/search/movie?query=${title}&page=1`;
        }

      const request = await fetch(searchURL, options);
      const response = await request.json();

      return ctx.render({
        results: response.results || [],
        columns,
        query: title || "",
      });
    } catch (_e) {
      return new Response("Error de API");
    }
  },
};

const Page = (props: PageProps<Data>) => {
  return (
    <div>
      <MoviesContainer
        Movies={props.data.results}
        columns={props.data.columns}
        query={props.data.query}
      />
    </div>
  );
};

export default Page;
