import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useCTAAction } from "../hook/useCTAAction";

export function CTA() {
  const { loading, handleAction } = useCTAAction();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-6 font-bold">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of teams already using our platform to build amazing
          products
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            disabled={loading}
            onClick={() => handleAction("Free Trial")}
            className="text-lg px-8 py-6 bg-white text-black border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 group"
          >
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              "Start Free Trial"
            )}
            {!loading && (
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            )}
          </Button>

          <Button
            size="lg"
            variant="outline"
            disabled={loading}
            onClick={() => handleAction("Schedule Demo")}
            className="text-lg px-8 py-6 bg-transparent text-white border-white hover:bg-white/10"
          >
            {loading ? "Processing..." : "Schedule Demo"}
          </Button>
        </div>
      </div>
    </section>
  );
}
