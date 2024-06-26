import type { Request } from "../../interfaces/presentation";

type insertion = {
    collection: string,
    document: any
}

export default (req: Request): insertion => {
    const { url, body } = req

    const [col, ...rest] = url.slice(1).split("/")

    return { collection: col, document: body }

}