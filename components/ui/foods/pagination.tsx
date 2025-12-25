"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../button";

export default function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(p));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <Button
        variant="outline"
        disabled={page === 1}
        onClick={() => goToPage(page - 1)}
      >
        Prev
      </Button>

      <span>
        Page {page + 1} of {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={page === totalPages - 1}
        onClick={() => goToPage(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
