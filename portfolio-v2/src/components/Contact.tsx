"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import { FiGithub, FiLinkedin, FiMail, FiCopy } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger, SplitText);

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const SOCIALS = [
  { icon: FiGithub, label: "GitHub", href: "https://github.com/Hardboy007" },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hardik-srivastava033/",
  },
  { icon: FiMail, label: "Email", href: "mailto:hardik77.aman@gmail.com" },
];

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useGSAP(
    () => {
      const split = SplitText.create(headingRef.current!, { type: "lines" });

      gsap.from(split.lines, {
        yPercent: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
      });

      gsap.from(".contact-form", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-form", start: "top 80%" },
      });

      gsap.from(".social-link", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".social-link", start: "top 90%" },
      });

      return () => split.revert();
    },
    { scope: containerRef },
  );

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Message sent! I'll get back to you soon.");
        reset();
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } catch {
      toast.error("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="bottom-right" theme="dark" />
      <section
        id="contact"
        ref={containerRef}
        className="px-6 md:px-16 py-28 md:py-36 border-t border-line"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          {/* LEFT */}
          <div>
            <p className="font-mono text-xs tracking-widest text-signal mb-4">
              CONTACT
            </p>

            <div className="overflow-hidden">
              <h2
                ref={headingRef}
                className="font-display font-semibold text-3xl md:text-5xl text-paper leading-[1.1]"
              >
                Let's build something real together.
              </h2>
            </div>

            <p className="text-paper-dim mt-6 leading-relaxed">
              Open to internships, freelance projects, and full-time roles. If
              you have an idea or opportunity, I'd love to hear about it.
            </p>

            <div className="mt-10 space-y-4">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full border border-line bg-ink-soft flex items-center justify-center text-paper-dim group-hover:text-signal group-hover:border-signal transition-all duration-300">
                    <Icon className="text-base" />
                  </div>
                  <span className="font-mono text-sm text-paper-dim group-hover:text-paper transition-colors duration-300">
                    {label}
                  </span>
                </a>
              ))}
              <button
                onClick={() => {
                  navigator.clipboard.writeText("your@email.com");
                  toast.success("Email copied to clipboard!");
                }}
                className="social-link flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-full border border-line bg-ink-soft flex items-center justify-center text-paper-dim group-hover:text-signal group-hover:border-signal transition-all duration-300">
                  <FiCopy className="text-base" />
                </div>
                <span className="font-mono text-sm text-paper-dim group-hover:text-paper transition-colors duration-300">
                  Copy Email
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="contact-form rounded-2xl border border-line bg-ink-soft p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* name */}
              <div>
                <label className="font-mono text-xs text-paper-dim mb-2 block">
                  NAME
                </label>
                <input
                  {...register("name")}
                  placeholder="Your name"
                  className="w-full bg-ink border border-line rounded-lg px-4 py-3 font-body text-sm text-paper placeholder:text-paper-dim/40 focus:outline-none focus:border-signal transition-colors"
                />
                {errors.name && (
                  <p className="font-mono text-[11px] text-red-400 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* email */}
              <div>
                <label className="font-mono text-xs text-paper-dim mb-2 block">
                  EMAIL
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-ink border border-line rounded-lg px-4 py-3 font-body text-sm text-paper placeholder:text-paper-dim/40 focus:outline-none focus:border-signal transition-colors"
                />
                {errors.email && (
                  <p className="font-mono text-[11px] text-red-400 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* message */}
              <div>
                <label className="font-mono text-xs text-paper-dim mb-2 block">
                  MESSAGE
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full bg-ink border border-line rounded-lg px-4 py-3 font-body text-sm text-paper placeholder:text-paper-dim/40 focus:outline-none focus:border-signal transition-colors resize-none"
                />
                {errors.message && (
                  <p className="font-mono text-[11px] text-red-400 mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full bg-signal text-ink font-mono text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </div>
        </div>

        {/* footer */}
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-line flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-xs text-paper-dim">
            © 2025 Hardik Srivastava
          </span>
          <span className="font-mono text-xs text-paper-dim">
            Built with Next.js · Three.js · GSAP
          </span>
        </div>
      </section>
    </>
  );
}
