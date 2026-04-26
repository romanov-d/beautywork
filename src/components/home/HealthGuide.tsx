"use client";

import Link from "next/link";
import ArrowIcon from "../ArrowIcon";

export default function HealthGuide() {
  return (
    <section className="guide-section">
      <h2 data-text-in-view="" className="display centre-align">Health Guide</h2>
      <div className="home-health-guides w-dyn-list">
        <div role="list" className="w-dyn-items">
          <div role="listitem" className="w-dyn-item">
            <div className="w-layout-grid global-grid is-posts">
              <div id="w-node-acf4bbbc-9f63-ef4b-7903-fe9fd847dcc6-0310c67f" className="paragraph-container is-posts">
                <h3 className="heading-5 is-cm">Expert insights on health, wellness, and modern care.</h3>
                <p className="is-cm">Explore expert-backed articles, product tips, and real stories designed to help you live and feel your best.</p>
                <Link data-button="" href="/health-guide" className="primary-button is-top-m w-inline-block">
                  <div data-button-text="">View all posts</div>
                </Link>
              </div>

              <div id="w-node-e378d958-eff7-ebf7-afd0-591dec73904e-0310c67f" className="post-item">
                <div className="post-image">
                  <div data-parallax="trigger" className="image-trigger">
                    <div data-parallax="target" className="image-target">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/6925fad6f251462044dcc6a5_freepik__give-me-a-editoiral-in-hand-product-shot-of-img1-m__90924.avif"
                        loading="lazy" alt="" sizes="100vw"
                        srcSet="/images/6925fad6f251462044dcc6a5_freepik__give-me-a-editoiral-in-hand-product-shot-of-img1-m__90924-p-500.avif 500w, /images/6925fad6f251462044dcc6a5_freepik__give-me-a-editoiral-in-hand-product-shot-of-img1-m__90924.avif 1264w"
                        className="image-full" />
                    </div>
                  </div>
                  <div className="read-tag w-condition-invisible">
                    <div className="subheading">5 Min Read</div>
                  </div>
                </div>
                <div className="post-info">
                  <h4 className="heading-5">What Is Sermorelin and Why Is It Used?</h4>
                  <Link data-button="" href="/post/what-is-sermorelin" className="primary-button is-secondary w-inline-block">
                    <ArrowIcon />
                    <div data-button-text="">Read article</div>
                  </Link>
                </div>
              </div>

              <div id="w-node-b5301709-4749-1f35-662c-d23de25c5748-0310c67f" className="post-item">
                <div className="post-image is-landscape">
                  <div data-parallax="trigger" className="image-trigger">
                    <div data-parallax="target" className="image-target">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/697d2d3c54002cd3bb0cfe2d_fellipe-ditadi-VJwHHnAkw7k-unsplash 2 (1).avif"
                        loading="lazy" alt="" sizes="100vw"
                        srcSet="/images/697d2d3c54002cd3bb0cfe2d_fellipe-ditadi-VJwHHnAkw7k-unsplash 2 (1)-p-500.avif 500w, /images/697d2d3c54002cd3bb0cfe2d_fellipe-ditadi-VJwHHnAkw7k-unsplash 2 (1)-p-800.avif 800w, /images/697d2d3c54002cd3bb0cfe2d_fellipe-ditadi-VJwHHnAkw7k-unsplash 2 (1).avif 1264w"
                        className="image-full" />
                    </div>
                  </div>
                </div>
                <div className="post-info is-wide">
                  <h4 className="heading-5">Semaglutide vs. Tirzepatide: What’s the Difference?</h4>
                  <Link data-button="" href="/post/semaglutide-vs-tirzepatide" className="primary-button is-secondary w-inline-block">
                    <ArrowIcon />
                    <div data-button-text="">Read article</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
