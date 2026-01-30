import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#151516] border-t border-white/10 py-12 text-[12px] text-[#86868b]">
      <div className="mx-auto max-w-[1024px] px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 font-semibold text-white">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/demo" className="hover:text-white hover:underline">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-white hover:underline">
                  Demo
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-white">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/login"
                  className="hover:text-white hover:underline"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-white hover:underline"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white hover:underline"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p>Copyright © 2026 itone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
