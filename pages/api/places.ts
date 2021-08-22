import { NextApiRequest, NextApiResponse } from "next";
import { searchPlace, Zip } from "util/places";

export default function placesApi(
  req: NextApiRequest,
  res: NextApiResponse<{
    zips?: Zip[];
    error?: string;
  }>
): void {
  const search = req.query.search ? String(req.query.search) : undefined;
  const zips = searchPlace(search);
  res.send({ zips });
}
