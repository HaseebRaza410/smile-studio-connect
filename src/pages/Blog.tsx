import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "5 Daily Habits for Healthy Teeth",
    excerpt: "Maintaining healthy teeth doesn't require complicated routines. Start your day by brushing for two full minutes using fluoride toothpaste. Floss daily to remove food particles between teeth that your brush can't reach. Limit sugary snacks and acidic drinks that erode enamel. Drink plenty of water throughout the day to wash away bacteria. Replace your toothbrush every three months or when bristles fray. These simple habits, practiced consistently, will keep your smile bright and cavity-free for years to come.",
    date: "January 15, 2024",
    readTime: "3 min read",
    category: "Oral Hygiene",
  },
  {
    id: 2,
    title: "What to Expect During Your First Dental Visit",
    excerpt: "Visiting a new dentist can feel intimidating, but knowing what to expect helps ease anxiety. Your first appointment typically begins with a comprehensive oral examination. The dentist will check your teeth, gums, and tongue for any signs of problems. X-rays may be taken to detect hidden issues like cavities or bone loss. You'll discuss your medical history and any concerns. A professional cleaning removes plaque and tartar buildup. Finally, the dentist will create a personalized treatment plan. Most first visits take about an hour, and you'll leave with a clear understanding of your oral health.",
    date: "January 10, 2024",
    readTime: "4 min read",
    category: "Dental Visits",
  },
  {
    id: 3,
    title: "Preventing Cavities: Easy Tips That Work",
    excerpt: "Cavities are preventable with the right approach. Brush twice daily with fluoride toothpaste to strengthen enamel. Cut back on sugary foods and drinks, especially between meals. Snack on cheese, vegetables, or nuts instead—they stimulate saliva production that naturally cleans teeth. Consider dental sealants for added protection on molars. Visit your dentist every six months for professional cleanings and early cavity detection. Chew sugar-free gum after meals when brushing isn't possible. With these strategies, you can maintain a cavity-free smile and avoid painful, costly dental procedures.",
    date: "January 5, 2024",
    readTime: "3 min read",
    category: "Prevention",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Blog
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Dental Health <span className="text-primary">Insights</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Stay informed with tips, advice, and the latest in dental care from our expert team.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-6xl">🦷</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="inline-block px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mb-3 hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Have Questions About Your Dental Health?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Our team is here to help. Book a consultation and get personalized advice.
            </p>
            <Button asChild variant="secondary" size="lg" className="rounded-lg">
              <Link to="/appointment">
                Book Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;