import React from "react";
import testContent from "./testContent.css";
export function TopContent() {
  return (
    <section>
      <div class="test-content__parent">
        <div class="test-content__heading">
          <div class="test-content__title"> language MCQ'S</div>
          <div class="test-content">Test content</div>
        </div>
        <div class="test-content-lists">
          <a class="test-content__listElement" href="">
            content
          </a>
        </div>
      </div>
    </section>
  );
}
